const express = require('express')
const multer = require('multer')
const bodyParser = require("body-parser");
const path = require('path')
const json_db = require('./json_db')

const app = express()
const PORT = 3000
const IMAGE_NAME_MAX_LENGTH = 10

// Настройка CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/upload'),
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname.substring(0, IMAGE_NAME_MAX_LENGTH));
    }
});

const upload = multer({
    storage: storage
})

const getError = (res, e) => {
  console.error(e)
  res.status(500).json({
    error: 'Произошла ошибка при обработке запроса',
    message: e.message
  })
}


app.post('/signIn', async (req, res) => {
  const { login, password } = req.body
  
  try {
    const user = await json_db.getTable('users', {
      condition: item => item.login === login && item.password === password
    })

    if (!user) 
      throw new Error('Неверные данные')

    res.json(user)
  } catch (e) {
    getError(res, e)
  }
})

app.post('/signUp', upload.single('image'), async (req, res) => {
  const { login, password } = req.body
  const image = req.file && req.file.filename
  
  try {
    const alreadyExist = await json_db.getTable('users', {
      condition: item => item.login === login && item.password === password
    })

    if(alreadyExist)
      throw new Error('Пользователь с таким логином уже существует')

    const userId = await json_db.writeToTable('users', {
      login, password, role: 'user', image
    })

    const user = await json_db.getTable('users', { condition: item => item.id === userId })

    res.json(user)
  } catch (e) {
    getError(res, e)
  }
});

app.post('/create_post', upload.single('image'), async (req, res) => {
  try {
    const image = req.file && req.file.filename
    const postData = req.body

    const newPost = await json_db.writeToTable('posts', {
      ...postData,
      tags: JSON.parse(postData.tags),
      comments: [],
      author_id: +postData.author_id,
      image })
    const post = await json_db.getTable('posts', { condition: item => item.id === newPost[0] })

    res.json(post)
  } catch (e) {
    getError(res, e)
  }
})

app.get('/get_posts', async (req, res) => {
  const { page, postsAmount, search} = req.query
  const tags = JSON.parse(req.query.tags)
  try {
    const posts = await json_db.getTable('posts', {
      isArray: true,
      condition: item => {
        const tagsCondition = tags.length === 0 ? true : item.tags.reduce((memo, tag) => {
          if(tags.includes(+tag))
            memo.push(tag)
          return memo
        }, []).length > 0
        return tagsCondition && (item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
          item.text.toLowerCase().indexOf(search.toLowerCase()) >= 0)
      }
    })

    const authorIds = posts.map(post => +post.authorId)
    const users = await json_db.getTable('users', { isArray: true, condition: user => authorIds.includes(+user.id) })

    const maxPostsCount = posts.length

    const postsOnPage = posts
                          .sort((a, b) => b.id - a.id)
                          .splice((page - 1) * postsAmount, postsAmount)
                          .map(post => {
                            post.user = users.find(user => +user.id === +post.authorId)
                            return post
                          })
    res.json({ postsOnPage, maxPostsCount })
  } catch(e) {
    getError(res, e)
  }
})

app.get('/get_single_post', async (req, res) => {
  const { postId } = req.query
  try {
    const post = await json_db.getTable('posts', { condition: item => +item.id === +postId })
    const user = await json_db.getTable('users', { condition: user => +user.id === +post.authorId })
    const tags = await json_db.getTable('tags', { isArray: true, condition: tag => post.tags.includes(+tag.id) })
    post.user = user
    post.tagsByName = tags.map(tag => tag.name)
    res.json(post)
  } catch(e) {
    getError(res, e)
  }
})

app.get('/get_user_by_id', async (req, res) => {
  const { id } = req.query
  try {
    const user = await json_db.getTable('users', { condition: item => +item.id === +id })
    res.json(user)
  } catch(e) {
    getError(res, e)
  }
})

app.get('/get_user_posts', async (req, res) => {
  const { id } = req.query
  try {
    const user = await json_db.getTable('users', { condition: user => +user.id === +id })

    if(!user)
      throw new Error('Пользователь не найден')

    const posts = await json_db.getTable('posts', { isArray: true, condition: post => +user.id === +post.authorId })
    res.json(posts.map(post => ({ id: post.id, title: post.title, date: post.date })).sort((a, b) => b.id - a.id))
  } catch (e) {
    getError(res, e)
  }
})

app.get('/get_post_comments', async (req, res) => {
  const { postId, page, commentsCount } = req.query
  try {
    const post = await json_db.getTable('posts', { condition: post => +post.id === +postId })
    const comments = await json_db.getTable('comments', { isArray: true, condition: comment => post.comments.includes(+comment.id) })
    const authorIds = comments.map(comment => +comment.authorId)
    const users = await json_db.getTable('users', { isArray: true, condition: user => authorIds.includes(+user.id) })
    const maxComments = comments.length
    const commentsOnPage = comments
                      .sort((a, b) => b.id - a.id)
                      .splice((page - 1) * commentsCount, commentsCount)
                      .map(comment => {
                        comment.user = users.find(user => +user.id === +comment.authorId)
                        return comment
                      })
    res.json({ commentsOnPage, maxComments })
  } catch (e) {
    getError(res, e)
  }
})

app.post('/create_comment', async (req, res) => {
  const { authorId, date, text, postId } = req.body
  try {
    const newIds = await json_db.writeToTable('comments', {
      authorId,
      date,
      text,
      postId
    })
    const post = await json_db.getTable('posts', { condition: post => +post.id === +postId })
    await json_db.updateFromTable('posts', post => +post.id === +postId, {
      comments: [newIds[0], ...post.comments]
    })
    const comment = await json_db.getTable('comments', { condition: comment => +comment.id === +newIds[0] })
    const author = await json_db.getTable('users', { condition: user => +user.id === +comment.authorId })
    comment.user = author
    res.json(comment)
  } catch (e) {
    getError(res, e)
  }
})

app.get('/get_tags', async (req, res) => {
  try {
    const tags = await json_db.getTable('tags')
    res.json(tags)
  } catch (e) {
    getError(res, e)
  }
})

app.post('/create_tag', async (req, res) => {
  const { name } = req.body
  try {
    const newIds = await json_db.writeToTable('tags', { name })
    const tag = await json_db.getTable('tags', { condition: tag => +tag.id === +newIds[0] })
    res.json(tag)
  } catch (e) {
    getError(res, e)
  }
})

app.post('/edit_tag_name', async (req, res) => {
  const { id, name } = req.body
  try {
    const tag = await json_db.updateFromTable('tags', tag => +tag.id === +id, { name })
    res.json(tag)
  } catch (e) {
    getError(res, e)
  }
})

app.post('/delete_tag', async (req, res) => {
  const { tagId } = req.body
  try {
    await json_db.deleteFromTable('tags', { condition: tag => +tag.id === +tagId })
    res.json(null)
  } catch (e) {
    getError(res, e)
  }
})

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
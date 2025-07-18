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

app.post('/create_post', upload.single('image'), async (req, res) => {
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
    post.user = user
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
  const { postId } = req.query
  try {
    const post = await json_db.getTable('posts', { condition: post => +post.id === +postId })
    const comments = await json_db.getTable('comments', { isArray: true, condition: comment => post.comments.includes(+comment.id) })
    const authorIds = comments.map(comment => +comment.authorId)
    const users = await json_db.getTable('users', { isArray: true, condition: user => authorIds.includes(+user.id) })
    const response = comments
                      .sort((a, b) => b.id - a.id)
                      .map(comment => {
                        comment.user = users.find(user => +user.id === +comment.authorId)
                        return comment
                      })
    res.json(response)
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
    res.json({ newIds })
  } catch (e) {
    getError(res, e)
  }
})

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
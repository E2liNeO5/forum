const express = require('express')
const multer = require('multer')
const bodyParser = require("body-parser");
const path = require('path')
const json_db = require('./json_db')

const app = express()
const port = 3000

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
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage
})

app.post('/create_post', upload.single('image'), async (req, res) => {
  const image = req.file && req.file.filename
  const postData = req.body

  const newPost = await json_db.writeToTable('posts', { ...postData, tags: JSON.parse(postData.tags), comments: [], image })
  const post = await json_db.getTable('posts', { condition: item => item.id === newPost[0] })

  res.json(post)
})

app.get('/get_posts', async (req, res) => {
  const { page, postsAmount } = req.query
  try {
    const posts = await json_db.getTable('posts')

    const postsOnPage = posts.splice((page - 1) * postsAmount, postsAmount)
    res.json(postsOnPage)
  } catch(e) {
    console.error(e);
    res.status(500).json({
      error: 'Произошла ошибка при обработке запроса',
      message: e.message
    });
  }
})

app.get('/get_single_post', async (req, res) => {
  const { postId } = req.query
  try {
    const post = await json_db.getTable('posts', { condition: item => +item.id === +postId })
    res.json(post)
  } catch(e) {
    console.error(e);
    res.status(500).json({
      error: 'Произошла ошибка при обработке запроса',
      message: e.message
    });
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
    console.error(e);
    res.status(500).json({
      error: 'Произошла ошибка при обработке запроса',
      message: e.message
    });
  }
})

app.post('/signUp', async (req, res) => {
  const { login, password } = req.body
  
  try {
    const alreadyExist = await json_db.getTable('users', {
      condition: item => item.login === login && item.password === password
    })

    if(alreadyExist)
      throw new Error('Пользователь с таким логином уже существует')

    const userId = await json_db.writeToTable('users', {
      login, password, role: 'user'
    })

    const user = await json_db.getTable('users', { condition: item => item.id === userId })

    res.json(user)
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Произошла ошибка при обработке запроса',
      message: e.message
    });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`)
})
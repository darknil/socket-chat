const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const SocketController = require('./src/controllers/socketController')
const authRouter = require('./src/routes/auth')
const router = require('./src/routes/index')
const chatRouter = require('./src/routes/chatRouter')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', router)

app.use('/api/', authRouter)
app.use('/api/chat', chatRouter)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.use((req, res, next) => {
  const filePath = path.join(__dirname, 'public', '404.html')
  res.status(404).sendFile(filePath)
})
const socketController = new SocketController(server)

server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000')
  console.log(`link: http://localhost:3000/`)
})

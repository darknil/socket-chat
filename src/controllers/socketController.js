// socketController.js

const socketIo = require('socket.io')

class SocketController {
  constructor(server) {
    this.io = socketIo(server)
    this.connections = []

    this.io.on('connection', (socket) => {
      this.connections.push(socket)
      console.log(`Пользователь ${socket.id} Подключился`)
      socket.on('join-room', (room, cb) => {
        socket.join(room)
        cb(`joined ${room}`)
        const clients = this.io.sockets.in(room).clients
        socket.to(room).emit('message', `users in ${room}: ${clients}`)
      })

      socket.on('message', (data, room) => {
        const userId = data.userId
        const message = data.message

        if (room === '') {
          socket.broadcast.emit('message', `${userId} : ${message}`)
        } else {
          socket.to(room).emit('message', `${userId} : ${message}`)
        }

        console.log(userId, message)
        this.io.emit('message', `${userId} : ${message}`)
      })

      socket.on('leave', (room) => {
        const message = `${socket.id} покинул комнату ${room}`
        console.log(message)
        socket.to(room).emit('left', message)
        socket.leave(room)
      })

      socket.on('disconnect', () => {
        this.io.emit('message', `Пользователь ${socket.id} отключился`)
        console.log(`Пользователь ${socket.id} отключился`)
      })
    })
  }
}

module.exports = SocketController

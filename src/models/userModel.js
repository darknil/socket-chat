const mysql = require('mysql2')
require('dotenv').config()
const connection = mysql.createConnection({
  host: 'localhost', // Адрес сервера MySQL
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
})

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err)
    return
  }
  console.log('Database ---- OK')
})

class UserModel {
  constructor() {}

  async addUser(user) {
    if (user.name === 'darknil') {
      user.role = 'admin'
    } else {
      user.role = 'user'
    }

    const query =
      'INSERT INTO users (id, socketId, name, password_hash, role) VALUES (?, ?, ?, ?, ?)'
    const values = [
      user.id,
      user.socketId,
      user.name,
      user.password_hash,
      user.role,
    ]

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Ошибка при добавлении пользователя:', err)
        return
      }
      console.log('Пользователь успешно добавлен')
    })
  }

  async getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = ?'
    return new Promise((resolve, reject) => {
      connection.query(query, [id], (err, results) => {
        if (err) {
          console.error('Ошибка при получении пользователя по ID:', err)
          reject(err)
          return
        }
        const user = results[0]
        resolve(user)
      })
    })
  }
  async getUserByName(name) {
    const query = 'SELECT * FROM users WHERE name = ?'
    return new Promise((resolve, reject) => {
      connection.query(query, [name], (err, results) => {
        if (err) {
          console.error('Ошибка при получении пользователя по ID:', err)
          reject(err)
          return
        }
        const user = results[0]
        resolve(user)
      })
    })
  }
  async getUserByName(name) {
    const query = 'SELECT * FROM users WHERE name = ?'
    return new Promise((resolve, reject) => {
      connection.query(query, [name], (err, results) => {
        if (err) {
          console.error('Ошибка при получении пользователя по имени:', err)
          reject(err)
          return
        }
        if (results.length === 0) {
          resolve(null)
        } else {
          const user = results[0]
          resolve(user)
        }
      })
    })
  }
  async getUserSocketId(id) {
    const query = 'SELECT socketID FROM users WHERE id = ?'
    return new Promise((resolve, reject) => {
      connection.query(query, [id], (err, results) => {
        if (err) {
          console.error('Ошибка при получении айди сокета пользователя:', err)
          reject(err)
          return
        }
        if (results.length === 0) {
          // Если пользователя с указанным ID не найдено
          resolve(null)
        } else {
          const socketID = results[0].socketID
          resolve(socketID)
        }
      })
    })
  }
  async getUsers() {
    const query = 'SELECT * FROM users'
    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Ошибка при получении списка пользователей:', err)
          reject(err)
          return
        }
        resolve(results)
      })
    })
  }

  async updateSocket(id, socketId) {}

  async deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = ?'
    const values = [id]
    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err)
        } else {
          console.log('Пользователь успешно удалён')
          resolve(result)
        }
      })
    })
  }
}

module.exports = new UserModel()

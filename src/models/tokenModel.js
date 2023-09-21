const mysql = require('mysql2')

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
})

class TokenModel {
  constructor() {}

  async saveRefreshToken(userId, refreshToken, expiration) {
    const query =
      'INSERT INTO refresh_tokens (user_id, token, expiration) VALUES (?, ?, ?)'
    const values = [userId, refreshToken, expiration]

    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  async validateRefreshToken(userId, refreshToken) {
    const query =
      'SELECT id FROM refresh_tokens WHERE user_id = ? AND token = ?'
    const values = [userId, refreshToken]

    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err)
        } else {
          // Если найдена запись с соответствующим userId и refreshToken, то токен валиден
          if (results.length > 0) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  }
  async deleteRefreshToken(userId, refreshToken) {}
  async findToken(userId) {
    const query = 'SELECT * FROM refresh_tokens WHERE user_id = ?'
    const values = [userId]

    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
}

module.exports = new TokenModel()

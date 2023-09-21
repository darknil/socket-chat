class User {
  constructor(username, password, role) {
    this.id = User.generateUniqueId()
    this.socketId = null
    this.name = username
    this.password_hash = password
    this.role = role
  }

  static generateUniqueId() {
    // Генерируем уникальный ID, например, на основе времени или случайного числа
    return Math.floor(Math.random() * 2147483647)
  }
}
module.exports = User

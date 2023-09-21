const UserModel = require('../models/userModel')

class UserController {
  async getUserById(req, res) {
    try {
      const userId = req.params.id
      const user = await UserModel.getUserById(userId)
      if (user) {
        // Если пользователь найден, отправьте его как успешный ответ
        res.status(200).json({ user })
      } else {
        // Если пользователь не найден, отправьте сообщение об ошибке
        res.status(404).json({ message: 'Пользователь не найден' })
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: e.message })
    }
  }
  async getUserByName(req, res) {
    try {
      const userName = req.params.name
      const user = await UserModel.getUserByName(userName)
      if (user) {
        // Если пользователь с указанным именем найден, отправьте его как успешный ответ
        res.status(200).json({ user })
      } else {
        // Если пользователь не найден, отправьте сообщение об ошибке
        res.status(404).json({ message: 'Пользователь не найден' })
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: e.message })
    }
  }
  async getUsers(req, res) {
    try {
      const users = await UserModel.getUsers()
      res.json(users)
    } catch (e) {
      res.status(400).json({ message: 'access denied' })
    }
  }
  async deleteUser(req, res) {
    try {
      const userIdToDelete = req.params.id
      const result = await UserModel.deleteUser(userIdToDelete)

      if (result.affectedRows > 0) {
        // Если удаление прошло успешно
        res.status(200).json({ message: 'Пользователь успешно удален' })
      } else {
        // Если ничего не было удалено (например, указанный ID не существует)
        res.status(404).json({ message: 'Пользователь не найден' })
      }
    } catch (e) {
      // Если произошла ошибка при удалении, передайте ее клиенту
      res.status(400).json({ message: e.message })
    }
  }
}

module.exports = new UserController()

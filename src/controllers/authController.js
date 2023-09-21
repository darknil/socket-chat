const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')
const User = require('../models/UserClass')
const tokenService = require('../service/token-service')
class authController {
  async registration(req, res) {
    try {
      const { username, password } = req.body
      const candidate = await UserModel.getUserByName(username)
      const hashedPassword = await bcrypt.hash(password, 10)
      if (candidate) {
        return res.status(400).json({ message: 'yet' })
      }
      const newUser = new User(username, hashedPassword, 'user')
      UserModel.addUser(newUser)
      return res.json({ message: 'registration successful' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Registration error' })
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await UserModel.getUserByName(username)
      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }
      const isPasswordValid = await bcrypt.compare(password, user.password_hash)
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' })
      }
      res.json({ message: 'correct password' })
    } catch (e) {
      console.log(e)
    }
  }
  async logout(req, res) {
    try {
      res.json('logout')
    } catch (e) {
      console.log(e)
    }
  }
}
module.exports = new authController()

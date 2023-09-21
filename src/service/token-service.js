const jwt = require('jsonwebtoken')
require('dotenv').config()
const tokenModel = require('../models/tokenModel')
class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1h',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findToken(userId)
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      const expirationDate = new Date(currentDate)
      expirationDate.setDate(currentDate.getDate() + 30)
      await tokenModel.saveRefreshToken(userId, refreshToken, expirationDate)
    }
  }
  async removeToken(refreshToken) {}
}

module.exports = new TokenService()

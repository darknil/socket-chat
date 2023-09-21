// routes/auth.js

const express = require('express')
const router = express.Router()
const path = require('path')
const authcontroller = require('../controllers/authController')
const userController = require('../controllers/userController')

router.post('/register', authcontroller.registration)
router.post('/login', authcontroller.login)
router.post('/logout', authcontroller.logout)

router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.delete('/users/:id', userController.deleteUser)
router.get('/users/name/:name', userController.getUserByName)

module.exports = router

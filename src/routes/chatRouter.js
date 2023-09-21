const Router = require('express').Router
const router = new Router()
const path = require('path')

router.get('/chat/:chatId/messages', (req, res) => {})
router.post('/chat/create', (req, res) => {})
router.post('/chat/:chatId/savemessage', (req, res) => {})
router.delete('/chat/:chatId/delete', (req, res) => {})
router.post('/chat/connect/')
module.exports = router

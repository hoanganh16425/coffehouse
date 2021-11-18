const express = require('express')
const router = express.Router()

const UserController = require('../app/controllers/userController')

router.get('/dang-ky', UserController.signin)
router.get('/dang-nhap', UserController.login)
router.post('/dk',UserController.register)
router.post('/dn',UserController.login2)
router.get('/profile',UserController.profile)
router.get('/logout',UserController.logout)
router.get('/', UserController.login)

module.exports = router
const express = require('express')
const router = express.Router()

const dichvuController = require('../app/controllers/dichvuController')

router.post('/dat-ban', dichvuController.datban)
router.get('/', dichvuController.dichvu)

module.exports = router
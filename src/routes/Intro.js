const express = require('express')
const router = express.Router()

const introController = require('../app/controllers/introController')

router.get('/', introController.intro)

module.exports = router
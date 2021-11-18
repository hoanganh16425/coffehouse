const express = require('express')
const router = express.Router()

const contactController = require('../app/controllers/contactController')

router.get('/', contactController.contact)

module.exports = router
const express = require('express')
const router = express.Router()

const cartController = require('../app/controllers/cartController')

router.get('/pay', cartController.pay)
router.patch('/pay', cartController.pay2)
router.patch('/dathang', cartController.dathang)
router.delete('/:slug', cartController.delete)
router.get('/', cartController.cart)

module.exports = router
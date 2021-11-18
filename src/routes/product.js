const express = require('express')
const router = express.Router()

const ProdController = require('../app/controllers/prodController')

router.get('/ca-phe-the-gioi', ProdController.ProductCPTG)
router.get('/ca-phe-viet', ProdController.ProductCPV)
router.get('/ca-phe-cam-hung', ProdController.ProductCPCH)
router.post('/add', ProdController.add)
router.get('/:slug', ProdController.showq)
router.get('/', ProdController.Product)


module.exports = router
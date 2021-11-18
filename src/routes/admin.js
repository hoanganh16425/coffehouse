const express = require('express')
const router = express.Router()

const adminController = require('../app/controllers/adminController')

router.get('/add', adminController.add)
router.post('/add', adminController.addpr)
router.delete('/:slug', adminController.delete)
router.get('/:slug/edit', adminController.edit)
router.put('/:slug', adminController.update)
router.put('/update/:slug', adminController.updateprofilead)
router.patch('/:slug', adminController.confirmbill)
router.get('/data-coffee', adminController.datacoffee)
router.get('/data-bills', adminController.databills)
router.get('/profile', adminController.adminprofile)
router.get('/', adminController.admin)

module.exports = router
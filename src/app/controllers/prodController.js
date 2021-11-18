const Product = require('../model/products')
const { onetoObject } = require('../../util/mongoose');
const { mutilmongoose } = require('../../util/mongoose')
const Bill = require('../model/bills')
class ProdController {
    // [GET] /san-pham
    Product(req, res, next) {
        Product.find()
            .then(products => {
                res.render('products/product', { products: mutilmongoose(products), un: req.session.username })
            })
            .catch(next)
    }
    // [GET] /san-pham/ca-phe-the-gioi
    ProductCPTG(req, res, next) {
        Product.find({ type: 'Cà phê thế giới' })
            .then(products => {
                res.render('products/caphethegioi', { products: mutilmongoose(products), un: req.session.username }
                )
            })
            .catch(next)
    }
    // [GET] /san-pham/ca-phe-viet
    ProductCPV(req, res, next) {
        Product.find({ type: 'Cà phê việt' })
            .then(products => {
                res.render('products/capheviet', { products: mutilmongoose(products), un: req.session.username }
                )
            })
            .catch(next)
    }
    // [GET] /san-pham/ca-phe-cam-hung
    ProductCPCH(req, res) {
        res.render('products/caphecamhung', { un: req.session.username });
    }
    // [GET] /san-pham/:slug
    showq(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then(products => {
                res.render('products/chitietsp', { products: onetoObject(products), un: req.session.username })
            })
            .catch(next)
    }
    // [POST] /san-pham/add
    async add(req, res, next) {
        try {
            const bills = new Bill(req.body)
            const bill = await Bill.findOne({
                $and: [{ sanpham: bills.sanpham },
                { tinhtrang: '0' }]
            })
            if (bill) {
                res.redirect('/cart')
                return
            }
            else {
                bills.username = req.session.username
                bills.save()
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProdController()
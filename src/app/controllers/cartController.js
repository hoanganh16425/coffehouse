const Bill = require('../model/bills')
const Product = require('../model/products')
const { mutilmongoose } = require('../../util/mongoose')
const bills = require('../model/bills')
class cartController {
    // [GET] /products/cart
    cart(req, res, next) {
        Bill.find({
            $and: [{ username: req.session.username },
            { tinhtrang: '0' }]
        })
            .then(bills => {
                res.render('products/cart', {
                    bills: mutilmongoose(bills), un: req.session.username
                })
            })
            .catch(next)
    }
    // [GET] /products/pay
    pay(req, res, next) {
        Bill.find({$and :[{ username: req.session.username },{tinhtrang: "0"}]})
            .then(bills => {
                res.render('pay', { bills: mutilmongoose(bills), un: req.session.username }
                )
            })
            .catch(next)
    }
    // [PATCH] /products/pay
    pay2(req, res, next) {
        Bill.updateOne({tinhtrang: "0"},
            {
                $set: {
                    tongcong: req.body.tongcong
                }
            }
        )
            .then(() => res.redirect('/cart/pay'))
            .catch(next)
    }
    // [PATCH] /products/dathang
    dathang(req, res, next) {
        Bill.updateMany({$and :[{ username: req.session.username },{ID: "#0000"}]},
            {
                $set: {
                    hovaten: req.body.hovaten,
                    sodt: req.body.sodt,
                    diachi: req.body.diachi,
                    tinhtrang: req.body.tinhtrang,
                    ID: req.body.ID,
                }
            }
        )
            .then(() => res.redirect('/user/profile'))
            .catch(next)
    }
    //DELETE /CART/SLUG
    delete(req, res, next) {
        Bill.deleteOne({ slug: req.params.slug })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new cartController()
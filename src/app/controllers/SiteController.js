const Product = require('../model/products')
const { mutilmongoose } = require('../../util/mongoose')
class SiteController {
     // [GET] /   
    index(req, res, next) {
        Product.find({ type: 'Cà phê thế giới' }).limit(8)
            .then(products => {
                res.render('home', { products: mutilmongoose(products),un: req.session.username }
                )
            })
            .catch(next)
    }
}

module.exports = new SiteController()

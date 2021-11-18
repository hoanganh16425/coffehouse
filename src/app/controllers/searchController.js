const Product = require('../model/products')
const { mutilmongoose } = require('../../util/mongoose');
const { session } = require('passport');
Product.ensureIndexes({name:"text"})

class searchController {
    // [GET] /search
    search(req, res ,next){
        Product.find({
            $or: [{name:{$regex:req.query.name,$options:"$i"}},
            {trademark:{$regex:req.query.name,$options:"$i"}}]})
            .then(products => {
                res.render('products/search',{
                    products: mutilmongoose(products),un: req.session.username
           })
           })
           .catch(next)          
        };      
    }

module.exports = new searchController()
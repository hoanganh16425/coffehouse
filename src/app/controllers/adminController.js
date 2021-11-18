const Product = require('../model/products')
const User = require('../model/user')
const Bill = require('../model/bills')
const { mutilmongoose } = require('../../util/mongoose');
const { onetoObject } = require('../../util/mongoose');
class adminController {
   // [GET] /admin/Data-coffee
  datacoffee(req, res, next) {
    if (req.session.daDangNhap && req.session.role) {
      Product.find()
        .then(products => {
          res.render('datatablecoffee', { products: mutilmongoose(products), un: req.session.username, ad : 1  }
          )
        })
        .catch(next)
    }
    else {
      res.render('error', {un: req.session.username, ad : 1});
    }
  }
   // [GET] /admin/Data-bills
  databills(req, res, next) {
    if (req.session.daDangNhap && req.session.role) {
      Bill.find({$and : [{tongcong: { $gt: 0}},{ID: {$ne: "#0000"}}]})
        .then(bills => {
          res.render('datatablebills', { bills: mutilmongoose(bills), un: req.session.username, ad : 1  }
          )
        })
        .catch(next)
    }
    else {
      res.render('error', {un: req.session.username, ad : 1});
    }
  }
     // [GET] /admin
  admin(req, res, next) {
    if (req.session.daDangNhap && req.session.role) {
      Product.find()
        .then(products => {
          res.render('admin', { ad : 1  }
          )
        })
        .catch(next)
    }
    else {
      res.render('error', {ad : 1});
    }
  }
   // [GET] /admin/adminprofile
  adminprofile(req, res, next) {
    if (req.session.daDangNhap && req.session.role) {
      User.findOne({username: req.session.username})
      .then(users => res.render('user/adminprofile', {
        users: onetoObject(users), un: req.session.username,ad:1
      }))
      .catch(next)
    }
    else {
      res.render('error', {un: req.session.username, ad : 1});
    }
  } 
   // [GET] /admin/add
  add(req, res, next) {
    if (req.session.daDangNhap && req.session.role) {
      res.render('products/add', { un: req.session.username })
    }
    else {
      res.render('error');
    }
  }
   // [POST] /admin/add
  addpr(req, res, next) {
    const products = new Product(req.body)
    products.save()
      .then(() => res.redirect('/admin/data-coffee'))
      .catch(error => {
      })
  }
   // [DELETE] /admin/:slug
  delete(req, res, next) {
    Product.deleteOne({ slug: req.params.slug })
      .then(() => res.redirect('back'))
      .catch(next)
  }
   // [GET] /admin/:slug/edit
  edit(req, res, next) {
    if (req.session.daDangNhap && req.session.role) {
      Product.findOne({ slug: req.params.slug })
        .then(products => res.render('products/edit', {
          products: onetoObject(products), un: req.session.username
        }))
        .catch(next)
    }
    else {
      res.render('error');
    }
  }
   // [PUT] /admin/:slug
  update(req, res, next) {
    if (req.session.daDangNhap && req.session.role) {
      Product.updateOne({ slug: req.params.slug }, req.body)
        .then(() => res.redirect('/admin/data-coffee'))
        .catch(next)
    }
    else {
      res.render('error');
    }
  }
  updateprofilead(req, res, next) {
    if (req.session.daDangNhap && req.session.role) {
      User.updateOne({ username: req.params.slug }, req.body)
        .then(() => res.redirect('back'))
        .catch(next)
    }
    else {
      res.render('error');
    }
  }
   // [PATCH] /products/pay
   confirmbill(req, res, next) {
    Bill.updateOne({ID: req.params.slug},
        {
            $set: {
                vanchuyen: req.body.vanchuyen
            }
        }
    )
        .then(() => res.redirect('back'))
        .catch(next)
}
}

module.exports = new adminController()

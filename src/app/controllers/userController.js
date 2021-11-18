
const User = require('../model/user')
const Bill = require('../model/bills')
const Product = require('../model/products')
const { mutilmongoose } = require('../../util/mongoose')
const Joi = require('joi')
const { encryptPassword } = require('../../util/encr')
const { response } = require('express')

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
})

class userController {
  // [GET] /dang-ky
  signin(req, res) {
    res.render('user/signin');
  }
  // [GET] /dang-nhap
  login(req, res) {
    res.render('user/login');
  }
  // [POST] /dk
  async register(req, res, next) {
    try {
      const result = userSchema.validate(req.body)
      if (result.error) {
        req.flash('error', 'Nhập sai dữ liệu , vui lòng nhập lại')
        res.redirect('/user/dang-ky')
        return
      }
      const user = await User.findOne({ email: result.value.email })
      if (user) {
        req.flash('error', 'Email đã tồn tại.')
        res.redirect('/user/dang-ky')
        return
      }
      const hash = await encryptPassword(result.value.password)
      delete result.value.confirmationPassword
      const newUser = new User()
      newUser.email = result.value.email
      newUser.username = result.value.username
      newUser.password = hash
      await newUser.save()

      req.flash('success', 'Đăng ký thành công , mời bạn đăng nhập.')
      res.redirect('/user/dang-nhap')

    } catch (error) {
      next(error)
    }
  }
  // [POST] /dn
  async login2(req, res, next) {
    try {
      const newUser = await new User(req.body)
      const user = await User.findOne({ email: newUser.email })
      if (!user) {
        req.flash('error', 'Email này chưa đăng ký.')
        res.redirect('/user/dang-nhap')
        return
      }
      else if (!user.validPassword(newUser.password)) {
        req.flash('error', 'Bạn nhập sai mật khẩu')
        res.redirect('/user/dang-nhap')
      }
      var sess = req.session;  //initialize session variable
      sess.daDangNhap = true;
      sess.username = user.username;
      sess.role=user.role;
      if(!sess.role){
      res.redirect('/user/profile')
      }
      else if(sess.role){
        res.redirect('/admin/profile')
      }
    } catch (error) {
      next(error)
    }
  }
  // [GET] /logout
  logout(req, res, next) {
    req.session.destroy();
    res.redirect("/user/dang-nhap");
  }
  // [GET] /profile
  profile(req, res, next) {
    if (req.session.daDangNhap) {
      Bill.find({$and : [{ username: req.session.username },{tongcong: { $gt: 0}},{ID: {$ne: "#0000"}}]})
      .then(bills => {
          res.render('user/profile', { bills: mutilmongoose(bills),un: req.session.username }
          )
      })
      .catch(next)
    }
    else {
      res.redirect('/user/dang-nhap');
    }
  }
}


module.exports = new userController()
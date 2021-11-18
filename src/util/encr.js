const bcrypt=require('bcrypt-nodejs')
const User=require('../app/model/user')
module.exports= {
    encryptPassword : function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);},

    validPassword: function (password) {
        return bcrypt.compareSync(password,User.password);
    }
  }
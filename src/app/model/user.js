const mongoose = require('mongoose');
const bcrypt=require('bcrypt-nodejs')
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type : String },
  username: { type : String },
  password: { type : String },
  role: { type : Boolean , default: false},
  telephonenumber: { type : String , default: "" },
  firstname: { type : String , default: "" },
  lastname: { type : String , default: "" },
  adress: { type : String , default: "" },
  city: { type : String , default: "" },
  country: { type : String , default: "" },
},{ timestamps: {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
} }
);
User.methods.validPassword= function (password) {
    return bcrypt.compareSync(password,this.password)
}
module.exports= mongoose.model('users', User);

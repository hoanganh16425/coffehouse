const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const Bill = new Schema({
  username: { type: String, maxLength: 255 },
  hovaten: { type: String, maxLength: 255, require: true },
  sanpham: { type: String, maxLength: 255 },
  img:{type:String},
  giale:{type:Number},
  sodt: { type: String, maxLength: 600 },
  diachi: { type: String,maxLength: 600 },
  ID: { type: String,default: "#0000"},
  gia: { type: Number },
  slug: { type: String, slug: 'sanpham' , unique: true },
  quantity:{type: Number},
  tinhtrang:{type: String, default: '0'},
  vanchuyen:{type: String, default: 'Đang xác nhận'},
  thanhtoan:{type: String, default: 'Chưa Thanh toán'},
  tongcong:{type: Number}
}
);

module.exports = mongoose.model('bills', Bill);

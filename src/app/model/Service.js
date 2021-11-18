const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Service = new Schema({
  name: String,
  SDT: String,
  Ngày: Date,
  Giờ : String
},{ timestamps: {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
} }
);
module.exports= mongoose.model('services', Service);

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const Product = new Schema({
  name: {type: String, maxLength: 255, require: true},
  trademark: {type: String, maxLength: 600},
  cost: {type: Number, require: true},
  img: {type: String},
  type: {type: String, maxLength: 600},
  slug: { type: String, slug: 'name' , unique: true },
},{ Timestamp: true,}  
);

module.exports= mongoose.model('Product', Product);

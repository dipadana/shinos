const mongoose = require('mongoose')

const menusSchema = new mongoose.Schema({
  food_name: String,
  food_type: String,
  food_description: String,
  food_price: String
})

module.exports = mongoose.model('menu', menusSchema)
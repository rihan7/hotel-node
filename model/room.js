const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({
   name: { type: String },
   slug: { type: String },
   type: { type: String },
   price: { type: Number },
   size: { type: Number },
   capacity: { type: Number },
   breakfast: { type: Boolean },
   pets: { type: Boolean },
   featured: { type: Boolean },
   description: { type: String },
   extras: [String],
   images: [String]
})

module.exports = mongoose.model('Room', Room)
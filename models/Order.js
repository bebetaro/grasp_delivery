const mongoose = require('mongoose');
const { Schema } = mongoose;
const processSchema = require('./Process');

const orderSchema = new Schema({
  drawNum: String,
  delivery: String,
  price: Number,
  quantity: Number,
  process: [processSchema],
  controlNumber: Number,
  _sender: { type: Schema.Types.ObjectId, ref: 'users' },
  reciever: String,
  designUrl: String,
  dateSent: Date
});

module.exports = mongoose.model('order', orderSchema);

//This Schema is used for sub document about process in Order schema

const mongoose = require('mongoose');
const { Schema } = mongoose;

const processSchema = new Schema({
  process: String,
  worker: String,
  madeDate: Date,
  imageUrl: String
});

module.exports = processSchema;

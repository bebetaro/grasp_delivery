const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  company: { type: String, required: true },
  lastname: { type: String },
  firstname: { type: String },
  _userId: String
});

module.exports = mongoose.model('users', userSchema);

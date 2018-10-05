const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String
});

//@ User Class (or User modal)
const User = mongoose.model('user', UserSchema);

module.exports = User;


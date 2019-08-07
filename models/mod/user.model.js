const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  openId: {
    type: String,
    index: true
  },
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  wx: {
    type: String,
  },
  sex: {
    type: Number,
  },
  //是否填写过简历信息
  hasresume: {
    type: Boolean,
    default: false
  },
  //是否有未读消息
  hassee: {
    type: Boolean,
    default: false
  }




});

module.exports = mongoose.model('User', UserSchema);
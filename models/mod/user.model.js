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
  wechat: {
    type: String,
  },
  sex: {
    type: Number,
  },
  hasresume: {
    type: Boolean,
    default: false
  }




});

module.exports = mongoose.model('User', UserSchema);
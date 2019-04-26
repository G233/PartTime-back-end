const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  //收信人openId 0 为所有人
  addressee: {
    type: String
  },
  title: {
    type: String
  },
  details: {
    type: String
  },
  hassee: {
    type: Boolean,
    default: false
  }


});

module.exports = mongoose.model('Message', MessageSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },

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
    type: Boolean
  }


});

module.exports = mongoose.model('Message', MessageSchema);
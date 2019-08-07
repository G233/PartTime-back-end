const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
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


},
{
  toJSON: { virtuals: true },
  versionKey: false,
  timestamps: { createdAt: 'date', updatedAt: 'updateTime' }
});
MessageSchema.virtual('day').get(function () {
  let x = this.date
  let y = (x.getMonth() + 1) + '-' + x.getDate() + ' ' + x.getHours() + ':' + x.getMinutes()
  return y;
});

module.exports = mongoose.model('Message', MessageSchema);
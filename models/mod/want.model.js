const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WantSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    autopopulate: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  // 简介
  message: {
    type: String
  },
  // 录取状态
  status: {
    type: Boolean,
    default: false
  },
  willd: {
    type: Boolean,
    default: false
  },

});
WantSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Want', WantSchema);
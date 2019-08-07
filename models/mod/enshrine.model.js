const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnshrineSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    autopopulate: true
  },
  willd: {
    type: Boolean,
    default: false
  },

});
EnshrineSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Enshrine', EnshrineSchema);
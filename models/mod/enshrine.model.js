const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnshrineSchema = new Schema({
  userId: {
    type: String,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  }

});

module.exports = mongoose.model('Enshrine', EnshrineSchema);
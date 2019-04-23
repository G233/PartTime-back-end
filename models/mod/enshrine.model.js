const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnshrineSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  }

});

module.exports = mongoose.model('Enshrine', EnshrineSchema);
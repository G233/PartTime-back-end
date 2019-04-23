const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  owner: {
    type: String,
    index: true,
  },
  name: {
    type: String
  },
  salary: {
    type: Number
  },
  details: {
    type: String
  },
  site: {
    name: String,
    address: String,
    latitude: String,
    longitude: String,
  },
  creatdate: {
    type: Date,
    default: Date.now()
  }

});

module.exports = mongoose.model('Job', JobSchema);
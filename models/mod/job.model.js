const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  openId: {
    type: String,
    index: true,
  },
  name: {
    type: String
  },
  chosetime: String,
  choselei: String,
  salary: {
    type: String
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
  },
  //是否招聘完成
  done: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model('Job', JobSchema);
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
      default: Date.now
    },

    //是否招聘完成
    done: {
      type: Boolean,
      default: false
    },
    time: String,
    employee: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true
    }]

  },

  {
    toJSON: { virtuals: true },
    versionKey: false,
    timestamps: {
      createdAt: 'creatdate',
      updatedAt: 'updatedAt'
    }
  });
JobSchema.virtual('dayago').get(function () {
  let nowday = new Date()
  let x = (nowday.getTime() - this.creatdate.getTime()) / (24 * 60 * 60 * 1000)
  return parseInt(x);
});
JobSchema.virtual('day').get(function () {
  let x = this.creatdate
  let y = x.getFullYear() + ' ' + (x.getMonth() + 1) + '-' + x.getDate() + ' ' + x.getHours() + ':' + x.getMinutes()
  return y;
});
JobSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Job', JobSchema);
//职位逻辑函数


const mongoose = require('mongoose');
const JobModel = mongoose.model('Job');
class Job {




  //添加职位
  static async addjob(ctx) {
    let { data, openId } = ctx.request.body
    data.openId = openId
    await JobModel.create(data)
    return ctx.success({ msg: '发布成功' })
  }












}
module.exports = Job
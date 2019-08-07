//对招聘关系的逻辑处理
const mongoose = require('mongoose');
const JobModel = mongoose.model('Job');
const UserModel = mongoose.model('User');
const WantModel = mongoose.model('Want')
const Message = require('../message/message.js')

class Relation {
  static async addwant(ctx) {
    let { jobId, userId, message } = ctx.request.body
    await WantModel.create({ jobId: jobId, userId: userId, message: message })
    let job = await JobModel.findById(jobId)
    let data = {
      addressee: job.openId,
      title: '嘻嘻嘻',
      details: '你发布的职位' + '「' + job.name + '」' + '有人申请啦' + '\n' + '快打开「我的发布」看看吧！'
    }
    Message.addmsg(data)
    return ctx.success({ msg: '申请成功' })
  }

  static async deletewant(ctx) {
    let { jobId, userId } = ctx.request.body
    console.log(jobId)
    await WantModel.findOneAndDelete({ jobId: jobId, userId: userId })
    return ctx.success({ msg: '取消申请成功' })
  }
  static async getwant(ctx) {
    let { userId } = ctx.request.body
    let wantlist = await WantModel.find({ userId: userId })
    return ctx.success({ data: wantlist })
  }
}
module.exports = Relation
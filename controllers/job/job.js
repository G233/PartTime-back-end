//职位逻辑函数


const mongoose = require('mongoose');
const JobModel = mongoose.model('Job');
const EnshrineModel = mongoose.model('Enshrine')
const Message = require('../message/message.js')

class Job {




  //添加职位
  static async addjob(ctx) {
    let { data, openId } = ctx.request.body
    data.openId = openId
    await JobModel.create(data)
    return ctx.success({ msg: '发布成功' })
  }
  //获取职位列表
  static async getjoblist(ctx) {
    let { page } = ctx.request.body
    let cout = 5
    let start = page * cout
    let joblist = await JobModel.find().sort({ creatdate: -1 }).skip(start).limit(cout)
    if (joblist.length > 0) {
      console.log(joblist)
      return ctx.success({ data: { list: joblist } })
    }
    else {
      return ctx.error({ code: 300 })
    }

  }
  // 添加收藏
  static async addenshrine(ctx) {
    let { jobId, openId } = ctx.request.body
    await EnshrineModel.create({ jobId: jobId, userId: openId })
    return ctx.success({ msg: '收藏成功' })
  }
  // 删除收藏
  static async deleteenshrine(ctx) {
    let { jobId, openId } = ctx.request.body
    // let data = {
    //   addressee: '0',
    //   title: '你好',
    //   details: '世界'
    // }
    // Message.addmsg(data)
    await EnshrineModel.findOneAndDelete({ jobId: jobId, userId: openId })
    return ctx.success({ msg: '删除收藏成功' })
  }















}
module.exports = Job
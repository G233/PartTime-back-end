//职位逻辑函数


const mongoose = require('mongoose');
const JobModel = mongoose.model('Job');
const EnshrineModel = mongoose.model('Enshrine')
const UserModel = mongoose.model('User');
const Message = require('../message/message.js')
const LeiModel = mongoose.model('Lei');
const WantModel = mongoose.model('Want')

class Job {
  static async getjobd(ctx) {
    console.log('aaaaaaaaaa')
    let { jobId } = ctx.request.body
    let job = await JobModel.findById(jobId)
    return ctx.success({ data: job })
  }



  //添加职位
  static async addjob(ctx) {
    let { data, openId } = ctx.request.body
    data.openId = openId
    await JobModel.create(data)
    return ctx.success({ msg: '发布成功' })
  }
  // 删除职位
  static async deletejob(ctx) {
    let { jobId } = ctx.request.body
    let job = await JobModel.findById(jobId)
    let wantlist = await WantModel.find({ jobId: jobId })
    for (let x of wantlist) {
      let user = await UserModel.findById(x.userId)
      let data1 = {
        addressee: user.openId,
        title: '通知',
        details: '您申请的职位' + '「' + job.name + '」' + '已被发起人删除'
      }
      Message.addmsg(data1)
    }
    let elist = await EnshrineModel.find({ jobId: jobId })
    for (let x of elist) {
      let user = await UserModel.findById(x.userId)
      let data2 = {
        addressee: user.openId,
        title: '通知',
        details: '您收藏的职位' + '「' + job.name + '」' + '已被发起人删除'
      }
      Message.addmsg(data2)
    }
    await EnshrineModel.remove({ jobId: jobId })
    await WantModel.remove({ jobId: jobId })
    await JobModel.remove({ _id: jobId })
    return ctx.success({ msg: '删除成功' })
  }


  //加载更多职位
  static async loadermore(ctx) {
    let { page, lei } = ctx.request.body
    let cout = 10
    let start = page * cout
    let joblist = await JobModel.find({ choselei: lei,done:false }).sort('-_id').skip(start).limit(cout)
    for (let x of joblist) {
      x.date = x.creatdate.getTime()
    }
    if (joblist.length > 0) {
      return ctx.success({ data: joblist })
    }
    else {
      return ctx.error({ code: 300 })
    }

  }
  //初始化首页数据
  static async getjoblist(ctx) {
    let res = await LeiModel.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "name",
          foreignField: "choselei",
          as: "jobs"
        },
      },
      { $unwind: { path: "$jobs", preserveNullAndEmptyArrays: true } },
      { $match: { 'jobs.done': false } }, 
      { $project: { 'name': 1, 'page': 1, 'jobs.choselei': 1, 'jobs.chosetime': 1, 'jobs.creatdate': 1, 'jobs.name': 1, 'jobs.salary': 1, 'jobs._id': 1, 'jobs.site.name': 1 } },
      { $sort: { "jobs._id": -1 } },
      { $group: { "_id": "$_id", "jobs": { $push: "$jobs" }, "name": { $first: "$name" }, "page": { $first: "$page" } } },
      { $sort: { "_id": 1 } },
    ])
    console.log(res)
    const nowday = new Date()

    const xx = nowday.getTime()
    for (let x of res) {
      x.jobs = x.jobs.slice(0, 10);
      for (let y of x.jobs) {
        let x = (xx - y.creatdate.getTime()) / (24 * 60 * 60 * 1000)
        y.dayago = parseInt(x);

        y.day = y.creatdate.getFullYear() + '-' + (y.creatdate.getMonth() + 1) + '-' + y.creatdate.getDate() + ' ' + y.creatdate.getHours() + ':' + y.creatdate.getMinutes()

      }
    }
    return ctx.success({ data: res })

  }
  //获取我发布的职位
  static async getmyjob(ctx) {
    let { openId } = ctx.request.body

    let res = await JobModel.aggregate([{
        $match: { "openId": openId }
      },
      {

        $lookup: {
          from: "wants",
          localField: "_id",
          foreignField: "jobId",
          as: "item"
        },
      },
      {
        $unwind: {
          path: '$item',
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $lookup: {
          from: "users",
          localField: "item.userId",
          foreignField: "_id",
          as: "item.userInfor"
        },
      },
      {
        $group: {
          _id: "$_id",
          item: { $push: "$item" },


          job: { $mergeObjects: "$$ROOT" }

        }
      },
      {
        $sort: { item: -1 }
      }
    ])
    return ctx.success({ data: res })




  }
  // 添加收藏
  static async addenshrine(ctx) {
    let { jobId, userId } = ctx.request.body
    let x = await EnshrineModel.findOne({ jobId: jobId, userId: userId })
    if (x) {
      return ctx.error({ msg: '已经收藏过啦', code: 300 })
    }
    else {
      await EnshrineModel.create({ jobId: jobId, userId: userId })
      return ctx.success({ msg: '收藏成功' })
    }

  }
  // 删除收藏
  static async deleteenshrine(ctx) {
    let { jobId, userId } = ctx.request.body
    let res1 = await EnshrineModel.findOneAndDelete({ jobId: jobId, userId: userId })
    if (res1) {
      return ctx.success({ msg: '删除收藏成功' })
    }
    else ctx.error({ code: 400, msg: '删除失败，请稍后重试' })

  }
  // 获取收藏列表
  static async getenshrine(ctx) {
    let { userId } = ctx.request.body

    let list = await EnshrineModel.find({ userId: userId })
    return ctx.success({ data: list })
  }
  // 获取分类列表
  static async getlei(ctx) {
    let leilist = await LeiModel.find()
    return ctx.success({ data: leilist })
  }
  // 求职确认
  static async cmoffice(ctx) {
    let { userId, data, } = ctx.request.body
    // 发布人
    let user2 = await UserModel.findById(userId)
    var that = this
    for (let x of data.item) {
      //申请人
      let user = await UserModel.findById(x.userId)
      await WantModel.findByIdAndUpdate(x._id, { status: x.status })
      await JobModel.findByIdAndUpdate(data.job._id, { done: true })
      if (x.status) {
        let data1 = {
          addressee: user.openId,
          title: '通知',
          details: '你好' + x.userInfor[0].name + '，恭喜你 ' + '「' + data.job.name + '」' + '职位' + '申请成功' + '\n' + '姓名为：' + user2.name + '\n' + '联系方式为：' + user2.phone
        }
        Message.addmsg(data1)
      } else {
        let data1 = {
          addressee: user.openId,
          title: '通知',
          details: '你好' + x.userInfor[0].name + '\n'+'遗憾的通知您 ' + '「' + data.job.name + '」' + '职位' + '申请被拒绝了',
        }
        Message.addmsg(data1)
      }
      await JobModel.findByIdAndUpdate(data.job._id, { '$push': { employee: x.userId } })

    }
    await WantModel.remove({jobId:data.job._id})
    return ctx.success({ msg: '确认成功' })
  }
















}
module.exports = Job
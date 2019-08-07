//用户逻辑函数


const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const axios = require("axios");
const Message = require('../message/message.js')
const JobModel = mongoose.model('Job');
const EnshrineModel = mongoose.model('Enshrine')
const WantModel = mongoose.model('Want')
class User {




  //登录
  static async login(ctx) {
    let { code } = ctx.request.body
    let res = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: 'wx810c94fefd2a180f',
        secret: '2e980fd184980ccf5ec5a30a292ef9eb',
        js_code: code,
        grant_type: "authorization_code"
      }
    })
    let data = {
      openId: res.data.openid,
      userId: ''
    }

    //判断是否登陆过
    const hasuser = await UserModel.findOne({ openId: res.data.openid })

    if (hasuser) {
      //console.log("其实还是老用户")
      //console.log(hasuser._id)
      data.userId = hasuser._id
    }
    else {
      //console.log("新用户")
      let ress = await UserModel.create({ openId: res.data.openid })
      //console.log(ress)
      data.userId = ress._id
    }
    //console.log(data)
    return ctx.success({ data: data })
  }

  //设置个人信息
  static async setresume(ctx) {
    let { data, openId } = ctx.request.body
    data.hasresume = true
    const res = await UserModel.findOneAndUpdate({ openId: openId }, data)
    return ctx.success({ msg: '个人信息更改成功' })
  }

  //获取个人信息
  static async getresume(ctx) {
    let { openId } = ctx.request.body
    const res = await UserModel.findOne({ openId: openId })
    return ctx.success({ data: res })
  }
  //测试接口
  static async test(ctx) {
    let data = {
      // addressee: "o1xKm5Ext9ZXfB1unuBtN3liTqBk",
      addressee: 0,
      title: '这里是第一封站内信',
      details: '给我们亲爱的东哥'
    }
    Message.addmsg(data)
    return ctx.success({})
  }
  //检查当前职位和用户的状态关系
  static async getDstatus(ctx) {
    let { userId, jobId } = ctx.request.body
    const res1 = await WantModel.findOne({ userId: userId, jobId: jobId })
    const res2 = await EnshrineModel.findOne({ userId: userId, jobId: jobId })
    //都没有
    //console.log('想要' + res1)
    //console.log('收藏' + res2)
    if (!res1 && !res2) {
      //console.log('都没有')
      return ctx.success({ data: '' })
    }
    // 已想要
    else if (res1 && !res2) {
      //console.log('已想要')
      return ctx.error({ code: 400 });

    }
    // 已收藏
    else if (!res1 && res2) {
      //console.log('已收藏')
      return ctx.error({ code: 300 });
    }
    // 都已
    else if (res1 && res2) {
      //console.log('都已')
      return ctx.error({ code: 500 });
    }

  }













}
module.exports = User
//用户逻辑函数


const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const axios = require("axios");
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
    }
    console.log(res.data.openid)
    //判断是否登陆过
    const hasuser = await UserModel.findOne(data)
    console.log(hasuser)
    if (hasuser) {
      console.log("其实还是老用户")
    }
    else {
      await UserModel.create({ openId: res.data.openid })
    }
    return ctx.success({ data: { openId: res.data.openid } })
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












}
module.exports = User
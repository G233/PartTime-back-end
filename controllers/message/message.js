// 站内信逻辑代码


const mongoose = require('mongoose');

const MessageModel = mongoose.model('Message')
const UserModel = mongoose.model('User');
class Message {
  //添加未读消息，0 为面向所有用户， 将收信人设为未读状态
  // 不对外暴露接口，仅可服务端使用
  static async addmsg(data) {
    //调用方法
    // let data = {
    //   addressee: 0,
    //   title: '你好',
    //   details: '世界' 
    // }
    // Message.addmsg(data)
    await MessageModel.create(data)
    if (data.addressee == 0) {
      //对象为 0 ，将循环设置所有用户未读状态，慎用
      let userlist = await UserModel.find()
      for (let x of userlist) {
        x.hassee = true
        x.save()
      }
    }
    else {
      await UserModel.findOneAndUpdate({ openId: data.addressee }, { hassee: true })
    }

  }
  //获取消息列表，并取消用户未读状态
  static async getmsg(ctx) {
    let { openId, page } = ctx.request.body
    //console.log(page)
    let cout = 5
    let start = page * cout
    let msglist = await MessageModel.find({ addressee: [openId, 0] }).sort('-date').skip(start).limit(cout)
    // 进入观看时将未读状态取消
    await UserModel.findOneAndUpdate({ openId: openId }, { hassee: false })
    return ctx.success({ data: { msglist: msglist } })
  }
}
module.exports = Message
// 站内信逻辑代码


const mongoose = require('mongoose');

const MessageModel = mongoose.model('Message')
class Message {
  static async addmsg(data) {
    await MessageModel.create(data)
  }
  static async getmsg(ctx) {
    let { openId } = ctx.request.body
    let msglist = await MessageModel.find({ addressee: [openId, 0] })
    return ctx.success({ data: { msglist: msglist } })
  }
}
module.exports = Message
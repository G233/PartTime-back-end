//import {User} from "../controllers/user/user"
const User = require('../controllers/user/user')
const Job = require('../controllers/job/job')
const Message = require('../controllers/message/message')
const router = require('koa-router')()


router
  // 用户相关
  .post('/login', User.login)
  .post('/setresume', User.setresume)
  .post('/getresume', User.getresume)
  // 职位相关
  .post('/addjob', Job.addjob)
  .post('/getjoblist', Job.getjoblist)
  .post('/addenshrine', Job.addenshrine)
  .post('/deleteenshrine', Job.deleteenshrine)
  //系统相关
  .post('/getmsg', Message.getmsg)







module.exports = router
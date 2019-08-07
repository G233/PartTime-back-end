//import {User} from "../controllers/user/user"
const User = require('../controllers/user/user')
const Job = require('../controllers/job/job')
const Message = require('../controllers/message/message')
const Relation = require('../controllers/relation/relation')

const router = require('koa-router')()


router
  // 用户相关
  .post('/login', User.login)
  .post('/setresume', User.setresume)
  .post('/getresume', User.getresume)
  .post('/getDstatus', User.getDstatus)
  // 职位相关
  .post('/addjob', Job.addjob)
  .post('/getjobd', Job.getjobd)
  .post('/deletejob', Job.deletejob)
  .post('/getjoblist', Job.getjoblist)
  .post('/addenshrine', Job.addenshrine)
  .post('/deleteenshrine', Job.deleteenshrine)
  .post('/getenshrine', Job.getenshrine)
  .post('/getlei', Job.getlei)
  .post('/getmyjob', Job.getmyjob)
  .post('/cmoffice', Job.cmoffice)
  .post('/loadermore', Job.loadermore)
  //系统相关
  .post('/getmsg', Message.getmsg)
  //招聘关系
  .post('/addwant', Relation.addwant)
  .post('/deletewant', Relation.deletewant)
  .post('/getwant', Relation.getwant)
  //测试接口
  .post('/test', User.test)







module.exports = router
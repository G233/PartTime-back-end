//import {User} from "../controllers/user/user"
const User = require('../controllers/user/user')
const Job = require('../controllers/job/job')

const router = require('koa-router')()


router
  .post('/login', User.login)
  .post('/setresume', User.setresume)
  .post('/getresume', User.getresume)
  // 职位相关
  .post('/addjob', Job.addjob)






module.exports = router
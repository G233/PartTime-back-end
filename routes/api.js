//import {User} from "../controllers/user/user"
const User = require('../controllers/user/user')

const router = require('koa-router')()


router
  .post('/login', User.login)

  .post('/setresume', User.setresume)
  .post('/getresume', User.getresume)






module.exports = router
var mongoose = require('mongoose');
require('../models/index')
mongoose.connect('mongodb://liugu:liu23358632@120.79.212.105:27017/parttime?authSource=admin');
//mongoose.connect('mongodb://127.0.0.1/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('数据库连接成功');
});
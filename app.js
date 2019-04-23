const Koa = require("koa");
const app = new Koa();
const db = require("./models/db");

const onerror = require("koa-onerror");
const mongoose = require("mongoose");

const logger = require("koa-logger");
const koaBody = require("koa-body");
const api = require("./routes/api");

// error handler
onerror(app);

// middlewares

app.use(logger());



app.use(
  koaBody({})
);

// logger
app.use(require("./middlewaers/log"));
// response
app.use(require("./middlewaers/response"));
//session

// routes
app.use(api.routes(), api.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
const Koa = require('koa')
const warning = require('warning')
const app = new Koa()
const path = require('path')
const logger = require('koa-logger')
const json = require('koa-json')
const onerror = require('koa-onerror')
const views = require('koa-views')
const config = require('./config')
const router = require('./routes')
const {
  freeze,
} = require('./util/')

app.use(async (ctx, next) => {
  // init CONF
  const _config = Object.assign(Object.create(null), config)
  freeze(_config)
  Object.defineProperty(ctx, 'AUTH_CONF', {
    get() {
      return _config
    },
    set() {
      const msg = 'Can not set ctx.AUTH_CONF !'
      warning(1, msg)
    }
  })
  await next()
})

// middleWares
app.use(json())
app.use(logger())

app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs'
}))

// routes
app.use(router.routes(), router.allowedMethods());

// 500 error
onerror(app, {
  template: '../views/500.ejs'
})

// 404 error
app.use(async (ctx) => {
  ctx.status = 404
  await ctx.render('404')
})

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

const port = process.env.PORT || 8484
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
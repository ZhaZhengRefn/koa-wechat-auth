const path = require('path')
const fs = require('fs')
const {
  fromFuncOrNot,
  hasKeys,
  chain,
} = require('../../util/')

const debug = require('./debug')
const goHtml = require('./go-html')
const goAuth = require('./go-auth')

const serviceChain = chain([
  debug,
  goHtml,
  goAuth,
])

module.exports = async (ctx) => {
  // 0.获取配置
  const {
    authentication,
    processHtml,
    htmlSrc,
    wxApp: getWxApp,
    openWeixinDomain: authDomain,
    frontEndHost,
    authRoute,
    scope,
  } = ctx.AUTH_CONF
  const html = fs.readFileSync(path.resolve(process.cwd(), htmlSrc), {
    encoding: 'utf8'
  })
  const domain = await fromFuncOrNot(frontEndHost)(ctx)

  const context = {
    authentication,
    processHtml,
    htmlSrc,
    getWxApp,
    authDomain,
    frontEndHost,
    authRoute,
    scope, 
    html,
    domain,
  }

  // 1.debug模式，带openId条件下直接登录
  // 2.授权成功，输出html
  // 3.授权失败，重定向至登录页获取code
  return await serviceChain(ctx, context)
}
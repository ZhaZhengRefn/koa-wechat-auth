const warning = require('warning')
const {
  checkWxApp,
} = require('../../util/check')
const {
  getUserByCode,
} = require('../../models/wxUser')

module.exports = async (ctx) => {
  // 0.获取配置
  const {
    wxApp: getWxApp,
    findUser,
    createToken,
    injectToken,
  } = ctx.AUTH_CONF

  // 1.获取重定向地址与公众号配置
  // TODO: 使用cookies方案还是query方案
  // const originUrl = ctx.cookies.get('redirect')
  const originUrl = decodeURIComponent(ctx.query.redirect)
  const wxApp = typeof getWxApp === 'function' ? getWxApp(ctx) : getWxApp
  warning(!checkWxApp(wxApp),
    `wxApp format error
    -----------------------
    it should include appId, appName, appSecret and id.`
  )
  debugger
  // 2.约定规格为query = { redirect: 'http://www.foobar.com', o: 'openId' }
  const openId = ctx.query.o

  // 3.根据openId获取用户信息
  const dbUser = await findUser(openId, wxApp)

  // 4.创建token
  const token = await createToken({
    wxApp,
    dbUser,
  })

  // 5.注入token
  await injectToken(ctx, token)

  // 6.重定向至原页面
  await ctx.render('forward', {
    url: originUrl
  })
}
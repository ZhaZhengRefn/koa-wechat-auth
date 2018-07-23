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
    patchUser,
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

  // 2.假设已经获取到code，则以code、appId、secrete向微信端换access_token。再以access_token换取user
  const code = ctx.query.code
  const {
    appId,
    appSecret,
  } = wxApp
  const wxUser = await getUserByCode(code, appId, appSecret)

  // 3.获取user后往数据库内创建用户
  const dbUser = await patchUser(wxUser, wxApp)

  // 4.创建token
  const token = await createToken({
    wxApp,
    wxUser,
    dbUser,
  })

  // 5.注入token
  await injectToken(ctx, token)

  // 6.重定向至原页面
  await ctx.render('forward', {
    url: originUrl
  })
}
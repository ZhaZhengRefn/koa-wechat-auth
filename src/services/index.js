const path = require('path')
const fs = require('fs')
const {
  fromFuncOrNot,
} = require('../util/')

const genRedirectUri = (domain, path, params) => {
  Object.keys(params).forEach(k => {
    const cur = params[k]
    path = path.replace(`/:${k}`, `/${cur}`)
  })
  return domain + path
}

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

  if (await authentication(ctx)) {
    // 1.1鉴权成功则渲染html
    ctx.body = typeof processHtml === 'function' ? processHtml(html) : html
  } else {
    // 1.2鉴权不成功则跳转至微信授权地址
    const wxApp = await fromFuncOrNot(getWxApp)(ctx)
    const domain = await fromFuncOrNot(frontEndHost)(ctx)
    const redirectUri = genRedirectUri(domain, authRoute, { ...ctx.params, type:'normal' })
    const url = `${authDomain}/connect/oauth2/authorize?appid=${wxApp.appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=#wechat_redirect`
    await ctx.render('redirect', {
      url
    })
  }
}
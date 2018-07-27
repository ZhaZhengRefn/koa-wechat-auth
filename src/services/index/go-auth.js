const {
  fromFuncOrNot,
  genRedirectUri,
} = require('../../util/')

//授权失败则跳转至登录页获取code
module.exports = async (ctx, context) => {
  const {
    getWxApp,
    domain,
    authRoute,    
    authDomain,
    scope,
  } = context

  const wxApp = await fromFuncOrNot(getWxApp)(ctx)
  const redirectUri = 
    genRedirectUri(domain, authRoute, { ...ctx.params, type:'normal' })
  const url = `${authDomain}/connect/oauth2/authorize?appid=${wxApp.appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=#wechat_redirect`
  //set redirectUrl cookie with redirect.ejs
  return await ctx.render('redirect', {
    url
  })  
}
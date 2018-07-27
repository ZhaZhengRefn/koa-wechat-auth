# koa-wechat-auth
封装微信网页授权的服务，执行包时带CONFIG环境变量，传入自定义配置的路径即可使用。

配置例子
```js
module.exports = {
  wxApp: {
    appId: '111',
    appSecret: '222',
    appName: 'foo',
    id: 72
  },
  scope: 'snsapi_userinfo',
  authRedirectUri() {
    return 'https://www.baidu.com'
  },
  processHtml(html) {
    return html.replace('<head>', `<head><script>window.HOST = 'test.domain.com'</script>`)
  },
  findUser(openId, wxApp) {
    return {
      oid: 'openId',
      sub: 'unionId',
      id: 28800
    }    
  },
  patchUser(wxUser, wxApp) {
    return {
      oid: 'openId',
      sub: 'unionId',
      id: 28800
    }
  },
  createToken({
    wxApp,
    wxUser,
    dbUser
  }) {
    return `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvaWQiOiJvcGVuSWQiLCJzdWIiOiJ1bmlvbklkIiwiYXBwIjoiZXhhbXBsZSIsImlkIjoyODgwMCwiZXhwIjoxNTMyMzQ3MDc1fQ==.XvPdOgkyYXuWLP0dKPWr6Et9mj9HP1zdFeAsw5gtxLw`
  },
  injectToken(ctx, token) {
    ctx.cookies.set('token', token, {
      domain: 'localhost',
      path: '/',
      expires: new Date(Date.now() + 604800000),
      httpOnly: false,
      overwrite: true,
    })
  }
}
```
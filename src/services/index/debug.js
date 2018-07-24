const {
  hasKeys,
  genRedirectUri,
} = require('../../util/')

//开启debug登录: 在query中传入debug与o字段，则开启传入oid直接登录模式
module.exports = async (ctx, context) => {
  const {
    domain,
    authRoute,
  } = context

  if (!hasKeys(ctx.query, ['debug', 'o']) || !ctx.query.debug) return 'next'

  const oid = ctx.query.o
  const redirectUri = encodeURIComponent(
    ctx.href
      .replace(ctx.origin, domain)
      .replace(ctx.querystring, '')
  )
  const location = genRedirectUri(domain, authRoute, { ...ctx.params, type:'debug' })
  const url = `${location}?o=${oid}&redirect=${redirectUri}`
  return await ctx.render('redirect', {
    url
  })
}
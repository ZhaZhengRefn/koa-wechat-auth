module.exports = async (ctx, context) => {
  const {
    authentication,
    processHtml,    
    html,
  } = context
  
  const isAuthorized = typeof authentication === 'function' ? await authentication(ctx) : false

  if (!isAuthorized) return 'next'

  return ctx.body = typeof processHtml === 'function' ? processHtml(html) : html
}
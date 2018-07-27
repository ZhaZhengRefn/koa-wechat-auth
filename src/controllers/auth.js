const strategies = {
  debug: require('../services/auth/debug'),
  normal: require('../services/auth/normal'),
}

module.exports = async (ctx, next) => {
  const type = ctx.params.type || 'normal'
  await strategies[type](ctx)
}
const indexService = require('../services/index')

module.exports = async (ctx, next) => {
  await indexService(ctx)
  // const title = `my name is kinso lee.`
  // await ctx.render('index', {
  //   title,
  // })
}
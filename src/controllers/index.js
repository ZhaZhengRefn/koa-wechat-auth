module.exports = async (ctx, next) => {
  const title = `my name is kinso lee.`
  await ctx.render('index', {
    title,
  })
}
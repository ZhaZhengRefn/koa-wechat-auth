module.exports = async (ctx) => {
  await ctx.render('index', {
    title: 'this is auth-normal'
  })
}
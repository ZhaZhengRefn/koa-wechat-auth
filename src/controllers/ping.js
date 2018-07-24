module.exports = async (ctx, next) => {
  ctx.status = 200
  await ctx.body = {
    errcode: 0,
    errmsg: 'Service available'
  }  
}
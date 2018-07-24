const path = require('path')
const fs = require('fs')

if (typeof process.env.CONFIG !== 'string') {
  throw new Error('must pass a config to the app')
}

const _empty = Object.create(null)
const _config = require(path.resolve(process.cwd(), process.env.CONFIG))
const _default = {
  indexRoute: process.env.INDEX_ROUTE || '/',
  authRoute: process.env.AUTH_ROUTE || '/auth/:type',
  pingRoute: '/ping,/health',
  openWeixinDomain: process.env.OPEN_WEIXIN_DOMAIN || 'https://open.weixin.qq.com',    
}

module.exports = Object.assign(_empty, _default, _config)
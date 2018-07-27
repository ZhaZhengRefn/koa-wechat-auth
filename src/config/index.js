const path = require('path')
const fs = require('fs')
const {
  mergeOptions,
} = require('../util/')

if (typeof process.env.CONFIG !== 'string') {
  throw new Error('must pass a config to the app')
}

const _empty = Object.create(null)
const _config = require(path.resolve(process.cwd(), process.env.CONFIG))
const _default = {
  indexRoute: process.env.INDEX_ROUTER || '/',
  authRoute: process.env.AUTH_ROUTER || '/auth/:type',
  pingRoute: process.env.PING_ROUTER || '/ping,/health',
  openWeixinDomain: process.env.OPEN_WEIXIN_DOMAIN || 'https://open.weixin.qq.com',    
}


const config = Object.assign(_empty, mergeOptions(_default, _config))

if (process.env.NODE_ENV !== 'production') {
  console.log('>>>>>config', config);
}

module.exports = config
exports.checkWxApp = app => {
  const _has = Object.prototype.hasOwnProperty
  const keys = [
    'appId',
    'appSecret',
    'appName',
    'id',    
  ]  
  return !keys.every(k => _has.call(app, k))
}
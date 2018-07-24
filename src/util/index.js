exports.fromFuncOrNot = fn => (...args) => {
  if (typeof fn === 'function') {
    return fn.apply(this, args)
  } 
  return fn
}

exports.hasKeys = (context, keys) => {
  const _has = Object.prototype.hasOwnProperty
  return keys.every(k => _has.call(context, k))
}

exports.genRedirectUri = (domain, path, params) => {
  Object.keys(params).forEach(k => {
    const cur = params[k]
    path = path.replace(`/:${k}`, `/${cur}`)
  })
  return domain + path
}

const after = function(fn, afterFn) {
  return async function(...args) {
    const result = await fn.apply(this, args)
    if (result === 'next') {
      return await afterFn.apply(this, args)
    }
    return result
  }
}

exports.chain = function(fns) {
  return fns.reduce((pre, next) => {
    return after(pre, next)
  })
}
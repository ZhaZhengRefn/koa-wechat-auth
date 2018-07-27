const fromFuncOrNot = fn => (...args) => {
  if (typeof fn === 'function') {
    return fn.apply(this, args)
  }
  return fn
}

const hasOwn = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

const hasKeys = (context, keys) => {
  const _has = Object.prototype.hasOwnProperty
  return keys.every(k => _has.call(context, k))
}

const genRedirectUri = (domain, path, params) => {
  Object.keys(params).forEach(k => {
    const cur = params[k]
    path = path.replace(`/:${k}`, `/${cur}`)
  })
  return domain + path
}

const after = function (fn, afterFn) {
  return async function (...args) {
    const result = await fn.apply(this, args)
    if (result === 'next') {
      return await afterFn.apply(this, args)
    }
    return result
  }
}

const chain = function (fns) {
  return fns.reduce((pre, next) => {
    return after(pre, next)
  })
}

const freeze = function (obj) {
  Object.freeze(obj)
  for (const key in obj) {
    if (hasOwn(obj, key)) {
      const cur = obj[key]
      if (typeof cur === 'object' && cur != null) {
        freeze(cur)
      }
    }
  }
  return obj
}

const mergeOptions = function (to, from) {
  const obj = Object.assign(Object.create(null), to)
  for (const key in from) {
    if (hasOwn(obj, key)) {
      obj[key] = from[key] || obj[key]
    } else {
      obj[key] = from[key]
    }
  }
  return obj
}

module.exports = exports = {
  fromFuncOrNot,
  hasKeys,
  genRedirectUri,
  chain,
  freeze,
  mergeOptions,
}
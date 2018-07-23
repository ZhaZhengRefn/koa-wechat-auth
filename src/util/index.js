exports.fromFuncOrNot = fn => (...args) => {
  if (typeof fn === 'function') {
    return fn.apply(this, args)
  } 
  return fn
}
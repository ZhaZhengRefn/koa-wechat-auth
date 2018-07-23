const path = require('path')
const fs = require('fs')

if (typeof process.env.CONFIG !== 'string') {
  throw new Error('must pass a config to the app')
}

const config = require(path.resolve(process.cwd(), process.env.CONFIG))

module.exports = config
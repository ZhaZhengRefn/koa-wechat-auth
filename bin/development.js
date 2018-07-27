const dev_conf = require('../development.json')
Object.keys(dev_conf).forEach(k => {
  process.env[k] = dev_conf[k]
})

module.exports = require('../src/app.js')
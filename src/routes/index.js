const config = require('../config/')
const router = require('koa-router')()
const indexCtrl = require('../controllers/index')
const authCtrl = require('../controllers/auth')
const pingCtrl = require('../controllers/ping')

const {
  authRoute,
  indexRoute,
  pingRoute,
} = config

const installPath = (pathString, ctrl) => {
  const paths = pathString.split(',').map(s => s.trim())
  paths.forEach(p => {
    router.get(p, ctrl)
  })
}

installPath(indexRoute, indexCtrl)
installPath(authRoute, authCtrl)
installPath(pingRoute, pingCtrl)

module.exports = router
const router = require('koa-router')()
const indexCtrl = require('../controllers/')

router.get('/', indexCtrl)

module.exports = router
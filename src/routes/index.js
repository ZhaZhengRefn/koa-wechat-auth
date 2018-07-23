const router = require('koa-router')()
const indexCtrl = require('../controllers/index')
const authCtrl = require('../controllers/auth')

router.get('/', indexCtrl)
router.get('/auth/:type', authCtrl)

module.exports = router
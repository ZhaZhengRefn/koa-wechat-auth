const router = require('koa-router')()
const indexCtrl = require('../controllers/index')
const authCtrl = require('../controllers/auth')
const pingCtrl = require('../controllers/ping')

router.get('/', indexCtrl)
router.get('/auth/:type', authCtrl)
router.get('/ping', pingCtrl)

module.exports = router
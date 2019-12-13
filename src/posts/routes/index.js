const router = require('koa-router')();
const search = require('../methods/search');

router.get('/search', search);

module.exports = router;

const router = require('koa-router')();
const posts = require('../posts/routes');

router.use('/posts', posts.routes());
module.exports = router;

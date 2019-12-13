const config = require('./config');
const Koa = require('koa');
const compress = require('koa-compress');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const bearerToken = require('koa-bearer-token');
const appRoute = require('./routes');
const userAgent = require('koa-useragent');
const errorHandler = require('./errorHandler');

require('./database');

const app = new Koa();
app.use(userAgent);
app.use(cors());
app.use(compress());
app.use(errorHandler);

app.use(
	koaBody({
		multipart: true,
		formLimit: 10000000,
		jsonLimit: 10000000,
		textLimit: 10000000,
		urlencoded: true,
		// formidable: { uploadDir: path.join(__dirname, '/temp') }, //This is where the files would come
	}),
);
app.use(
	bearerToken({
		bodyKey: 'accessToken',
		queryKey: 'accessToken',
		headerKey: 'Bearer',
		reqKey: 'token',
	}),
);
app.use(appRoute.routes());

const server = app.listen(config.port);
console.log('Kodo Server running on port ' + config.port);
console.log('TIMEZONE ', Intl.DateTimeFormat().resolvedOptions().timeZone);
console.log('LOCALE ', process.env.LOCALE);

module.exports = {
	server,
};

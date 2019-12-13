module.exports = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		if (err.status === undefined) {
			ctx.status = 500;
			ctx.body = '';
			console.log(err);
		} else {
			ctx.status = 400;
			ctx.body = err.message;
		}
	}
};

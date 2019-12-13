const PostModel = require('../models');
const HttpError = require('http-error-constructor');

module.exports = async ctx => {
	const { query } = ctx.request;
	let { q, page, limit } = query;
	page = parseInt(page);
	limit = parseInt(limit);

	if (page <= 0) {
		throw new HttpError(404, 'Invalid Page Number');
	}

	if (limit < 0) {
		throw new HttpError(404, 'Invalid Limit Number');
	}

	const searchQuery = generateSearchQuery(q);

	const total = await PostModel.countDocuments(searchQuery);

	const posts = await PostModel.find(searchQuery)
		.skip(limit * ((page && page - 1) || 0))
		.limit(limit || 0)
		.lean()
		.exec();
	ctx.status = 200;

	ctx.body = { total, data: posts };
};

const generateSearchQuery = str => {
	const searchQuery = {};
	if (typeof str === typeof '') {
		str = str.trim();

		if (str.charAt(0) === '"' && str.charAt(str.length - 1) === '"') {
			str = str.substr(1, str.length - 2);
			searchQuery.name = new RegExp(str, 'i');
			searchQuery.description = new RegExp(str, 'i');
		} else {
			let temp = str.split(' ');
			searchQuery.name = new RegExp(temp.join('|'), 'i');
			searchQuery.description = new RegExp(temp.join('|'), 'i');
		}
	}
	return searchQuery;
};

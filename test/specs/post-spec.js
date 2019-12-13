const chai = require('chai');
const chaiHttp = require('chai-http');
const { server } = require('../../src/app');
const expect = chai.expect;

chai.use(chaiHttp);
describe('Posts', () => {
	describe('Search', () => {
		const request = chai.request(server).keepOpen();
		after(() => {
			request.close();
		});
		it(`should give status 400 with limit=-1`, done => {
			request.get('/posts/search?limit=-1').end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
		});
		it(`should give status 400 with limit=0 and page=-1`, done => {
			request.get('/posts/search?limit=-1&page=-1').end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
		});

		it(`should give status 200 with limit=1 and page=1`, done => {
			request.get('/posts/search?limit=1&page=1').end((err, res) => {
				expect(res.body.data).to.be.an('array');
				expect(res.body.data.length).to.equal(1);
				expect(res.body.total).to.equal(100);
				done();
			});
		});

		it(`should give status 200 with limit=1, page=1 and q=International Brand`, done => {
			request.get('/posts/search?limit=1&page=1&q=International Brand').end((err, res) => {
				expect(res.body.data).to.be.an('array');
				expect(res.body.data.length).to.equal(1);
				expect(res.body.total).to.equal(13);
				done();
			});
		});

		it(`should give status 200 with limit=1, page=1 and q="International Brand"`, done => {
			request.get('/posts/search?limit=1&page=1&q="International Brand"').end((err, res) => {
				expect(res.body.data).to.be.an('array');
				expect(res.body.data.length).to.equal(1);
				expect(res.body.total).to.equal(1);
				done();
			});
		});
	});
});

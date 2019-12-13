const mongoose = require('mongoose');
const MongoConfig = require('./config');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

let URI = MongoConfig.local;

if (process.env.NODE_ENV in MongoConfig) {
	URI = MongoConfig[process.env.NODE_ENV];
}

console.log(URI);

mongoose.connect(URI, { useNewUrlParser: true });

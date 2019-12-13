const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({});

mongoose.model('Posts', PostSchema, 'Posts');
module.exports = mongoose.model('Posts');

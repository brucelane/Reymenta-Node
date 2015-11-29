var mongoose = require('mongoose');

module.exports = mongoose.model('Shader', {
	title: String,
	url: String,
	frag: String
});
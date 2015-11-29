module.exports = function (info) {
	
	var values = {
		title: null,
		url: null,
		frag: null,
		created: null
	};
	
	for (var prop in values) {
		if (values[prop] !== 'undefined') {
			values[prop] = info[prop];
		}
	}
	
	var functions = {
		triggerCreate: function () {
			values.created = Date.now();
		},
		getInformation: function () {
			return values;
		}
	};
	
	return functions;

};
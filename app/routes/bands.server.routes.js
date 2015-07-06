'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var bands = require('../../app/controllers/bands.server.controller');

	// Bands Routes
	app.route('/bands')
		.get(bands.list)
		.post(users.requiresLogin, bands.create);

	app.route('/bands/:bandId')
		.get(bands.read)
		.put(users.requiresLogin, bands.hasAuthorization, bands.update)
		.delete(users.requiresLogin, bands.hasAuthorization, bands.delete);

	// Finish by binding the Band middleware
	app.param('bandId', bands.bandByID);
};
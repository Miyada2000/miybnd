'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	Band = mongoose.model('Band');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;
	var selectedBandID = null;
	
	console.log(user);
	
	try{
		selectedBandID = req.body.selectedBand._id ;
	}catch(err){
		//console.log('no band selected');
	}
	
	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;
	delete req.body.selectedBand;
	delete req.body.password;
	delete req.body.salt;
	

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;
		user.selectedBand = selectedBandID;
		
		
		console.log(user);

		user.save(function(err) {
			if (err) {
				console.log(err);
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
					
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						
						
						User.findOne({_id: user._id}).populate('selectedBand','name').exec(function(err, user) {
							if (err) {
								
								res.status(400).send(err);
							}else {
								res.json(user);		
								
							}
						});
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};


/**
 * list user bands
 */
exports.userBands = function(req, res) {
	// Init Variables
	//var userID = req.user._id;
	var userID = req.profile._id;
	var selectedBandID = undefined;
	
	if(req.profile.selectedBand){
	 	selectedBandID = req.profile.selectedBand._id;
	}
	
	Band.userBands(userID, selectedBandID, function (bands){
		//console.log(bands);
		res.json(bands);
	}) ;
	
};


/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};
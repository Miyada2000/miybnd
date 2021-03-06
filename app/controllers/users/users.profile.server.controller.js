'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	Band = mongoose.model('Band'),
	jwt    = require('jsonwebtoken'), // used to create, sign, and verify tokens
	config = require('../../../config/config');


/**
 * list user bands
 */
exports.listBands = function(req, res) {
	// Init Variables
	var userID = req.user._id;
	var selectedBandID = 0;
    if (req.user.selectedBand)  selectedBandID = req.user.selectedBand._id;
	 
	Band.userBands(userID, selectedBandID, function (bands){
		res.json(bands);
	}) ;
	
};



 //set user profile picture
exports.getProfile = function(req, res) {
    
    if(req.user){    
        User.findOne({_id: req.user._id}).select({_id: 1, profile: 1, contact:1, channels:1 }).exec(function(err, user) {      
            if (err){
                return res.status(401).send({message: err});                            
            }
            res.json({success: true, data: user});	
        });
    }else{
        return res.status(401).send({message: 'User not logged in'});    
    }           
};


 //set user profile picture
exports.updateProfile = function(req, res) {
	// check header or url parameters or post parameters for picture
	var profile = req.body.profile || req.query.profile;
    var contact = req.body.contact || req.query.contact;
    var channels = req.body.channels || req.query.channels;
    
    if(req.user && (profile || contact || channels)){
    
        User.findOne({_id: req.user._id}).select({_id: 1, profile: 1, contact:1, channels:1 }).exec(function(err, user) {
		  
            if (!user.profile) user.profile = {};
            if (!user.contact) user.contact = {};
            if (!user.channels) user.channels = {};
            
            if(profile){
                user.profile = profile;
                user.markModified('profile');                
            }

            if(contact){
                user.contact = contact;
                user.markModified('contact');                
            }

            if(channels){
                user.channels = channels;
                user.markModified('channels');                
            }

            // And save the user
            user.save(function(err) {
                
                if (err){
                    return res.status(401).send({message: err});                            
                }
                res.json({success: true, message: 'Update sucessfuly'});	
            });

        });

    
    }else{
        return res.status(401).send({message: 'User not logged in'});    
    }           
};



/**
 * Set user picture
 */
exports.picture = function(req, res) {
	// check header or url parameters or post parameters for picture
	var pic = req.body.picture || req.query.picture;
    
    
    console.log(req.user);
	
    if(req.user){
        User.findOne({_id: req.user._id}).select({_id: 1, picture:1 }).exec(function(err, user) {
		  
            if (err){
                return res.status(401).send({message: 'couldn´t save the picture ' + err});    
            } 
            
            user.picture = pic;
            
            user.save(function(err) {
                res.json({success: true, data: user});	
            });



    	});
      
        


    
    }else{
        return res.status(401).send({message: 'User not logged in'});    
    }       
    
    
};



/**
 * list user bands
 */
exports.setCurrentBand = function(req, res) {
	// Init Variables
	var newCurrentBandID = req.body.newCurrentBand;
	
	User.setCurrentBand(req.user._id, newCurrentBandID, function(updated){
		if (updated){
				User.findById(req.user._id).populate('selectedBand','name').exec(function(err, user) {
				if (err) {					
					res.status(400).send(err);
				}else {
					user.password = undefined;
					user.salt = undefined;	
					
					// create a token
					var token = jwt.sign(user, config.secret, {
						expiresInMinutes: 1440 // expires in 24 hours
					});
			
					var userID = user._id;
					var selectedBandID = 0;
                    if(user.selectedBand) selectedBandID = user.selectedBand._id;
					
					Band.userBands(userID, selectedBandID, function (bands){
						user.bands = [];
						user.bands = bands;

						res.json({
							success: true,
							token: token,
							data: user
						});	
		
					}); //end userband
					
				} //end if
			}); //find user
		}//end if updated
	}); //end setcurrentband	
};



/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;
	var selectedBandID = null;
	
	//console.log(user);
	
	try{
                        
        if(req.body.selectedBand) selectedBandID = req.body.selectedBand._id ;
		
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
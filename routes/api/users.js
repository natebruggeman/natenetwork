const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator/check')

const User = require('../models/User.js');

// @route 		GET api/users
// @desc 		Test route
// @access 		Public
router.post(
	'/', 
	[
		check('name','Name is required')
		.not()
		.isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min:6 })
	],
	(req,res) => {
		console.log(req.body);
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({ errors: errors.array()});
		}

		// const { name, email, password }	

		// See if user exists 
		// Get users gravatar
		// Encrypt pw using bcrypt
		// Return jsonwebtoken so when signing up, you log in


		res.send('User route');
});




module.exports = router;
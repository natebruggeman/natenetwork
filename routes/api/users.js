const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
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
	async (req,res) => {
		console.log(req.body);
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({ errors: errors.array()});
		}

		//grabbing name,email, and pw from req.body
		const { name, email, password }	= req.body;

		try{
			let user = await User.findOne({ email });

			// if user already exists, send message back
			if(user) {
				 return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
			}

			const avatar = gravatar.url(email, {
				s: '200', //size
				r: 'pg', //rating
				d: 'mm' //default to user icon
			})

			user = new User({
				name,
				email,
				avatar,
				password
			});

			// hashing new users password 
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();
		
			res.send('User registered')


		} catch(err) {
			console.error(err.message);
			res.status(500).send('Server error')
		}




		res.send('User route');
});




module.exports = router;
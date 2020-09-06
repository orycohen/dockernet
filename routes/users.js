var router = require('express').Router();
var debug = require('debug')('app:routes-user');
var User = require('../model')('User');
var passport = require('passport');

function checkNotAuth(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/');
	}
	else {
		next();
	}
}

router.get('/login', checkNotAuth, (req, res) => {
	res.render('login.ejs');
});

router.post('/login', checkNotAuth,
	passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
		res.redirect('/home');
	}
);

router.get('/register', checkNotAuth, (req, res) => {
	res.render('register.ejs');
});

router.post('/register', checkNotAuth, (req, res) => {
	User.create(req.body, (err) => {
		res.send('Thank You');
	});
});

module.exports = router;

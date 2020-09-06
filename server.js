require('dotenv').config();

var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var session = require('express-session');
var debug = require('debug')('app:server');
var passport = require('passport');
var http = require('http');
var httpProxy = require('http-proxy');
var User = require('./model')('User');
var MongoStore = require('connect-mongo')(session);

var sessionMid = session({
	key: 'users.sid',
	saveUninitialized: false,
	resave: false,
	secret: 'secret',
	rolling: true,
	store: new MongoStore({ url: process.env.MONGO_CONN_STRING }),
	cookie: {
		maxAge: 1000*60*5,
		httpOnly: true,
	}
});

passport.use(new LocalStrategy((username, password, done) => {
	User.findOne({ username: username }, (err, user) => {
		if (err) return done(err);
		if (!user) return done(null, false);
		if (user.password != password) return done(null, false);
		return done(null, user);
	});
}));

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(null, user);
	});
});

const app = express();
const PORT = process.env.PORT || 1234;

app.use((req, res, next) => { sessionMid(req, res, next) });
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/users'));
app.use('/', require('./routes/general'));

app.listen(PORT, () => debug(`Running on port ${PORT}`));

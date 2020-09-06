var router = require('express').Router();
var Item = require('../model')('Item');

function checkAuth(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/login');
	}
	else {
		next();
	}
}

router.get('/home', checkAuth, (req, res) => {
	res.render('home.ejs', {name: req.user.firstName});
});

router.get('/add-item', checkAuth, (req, res) => {
	res.render('additem.ejs');
});

router.post('/add-item', checkAuth, (req, res) => {
	Item.create(req.body, err => {
		res.redirect('/items');
	});
})

router.delete('/remove-item', checkAuth, (req, res) => {
	debug('removing item: ', req.body.itemName);
	res.send('Thank you for deleting');
});

router.get('/items', checkAuth, (req, res) => {
	Item.find({}, (err, items) => {
		res.render('items.ejs', {items: items});
	});
});

router.get('/', (req, res, next) => { if (req.isAuthenticated()) res.redirect('/home'); else next(); }, (req, res) => {
	res.render('index.ejs');
});

module.exports = router;

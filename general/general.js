var router = require('express').Router();

router.get('/home', (req, res) => {
	res.render('home.ejs', {name: 'Ori'});
});

router.get('/', (req, res) => {
	res.render('index.ejs');
});

module.exports = router;

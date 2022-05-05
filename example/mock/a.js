const a = (req) => ({
	code: 0,
	data: req.body,
});

a.method = 'get';
module.exports = a;

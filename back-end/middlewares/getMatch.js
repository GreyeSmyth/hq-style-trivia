function getMatch(req, res, next) {
	const { matchCode } = req.body;
	req.match = req.app.locals.matches[matchCode];

	next();
}

module.exports = getMatch;

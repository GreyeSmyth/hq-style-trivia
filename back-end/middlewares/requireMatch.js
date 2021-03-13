function requireMatch(req, res, next) {
	if (req.match) {
		next();
	} else {
		res.status(404).json({
			'no-such-match',
			'No match was found with the requested code',
		});
	}
}

module.exports = requireMatch;

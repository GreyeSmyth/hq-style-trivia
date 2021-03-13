function requirePlayer(req, res, next) {
	const { playerID } = req.body;
	req.player = req.match.getPlayer(playerID);
	
	if (req.player) {
		next();
	} else {
		res.status(404).json({
			'no-such-player',
			'No player was found with the requested ID',
		});
	}
}

module.exports = requirePlayer;

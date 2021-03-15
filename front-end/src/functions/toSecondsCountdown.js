function toSecondsCountdown(tZero) {
	const millisTo = Math.max(tZero.getTime() - Date.now(), 0);
	const secondsTo = Math.ceil(millisTo / 1000);

	return secondsTo;
}

export default toSecondsCountdown;

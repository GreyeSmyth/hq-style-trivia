import { now } from 'mobx-utils';


function toSecondsCountdown(tZero) {
	
	const millisTo = Math.max(tZero.getTime() - now(100), 0);
	const secondsTo = Math.ceil(millisTo / 1000);

	return secondsTo;
}

export default toSecondsCountdown;

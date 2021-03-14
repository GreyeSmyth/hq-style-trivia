const ws = require('ws');

const config = require('./config');
const methods = require('./methods');

const malformedRequestError = require('./errors/malformedRequestError');


const wss = ws.Server({
	port: config.port,
	clientTracking: true,
});


const matches = {};
const matchesContext = {
	addMatch: (newMatch, matchCode) => {
		matches[matchCode] = newMatch;
	},
	getMatch: matchCode => matches[matchCode],
	removeMatch: matchCode => {
		delete matches[matchCode];
	},
};

wss.on('connection', ws => {
	ws.on('message', message => {
		let response;
		try {
			const { method, ...params } = JSON.parse(message);
			response = methods[method](params, {
				notifyClient: messageJSON => {
					try {
						const message = JSON.stringify(messageJSON);
						ws.send(message);
					} catch(e) {
						// TODO: log error
					}
				},
				disconnect: () => ws.close(0, 'Socket closed from normal operations.'),
				...matchesContext,
			});
		} catch(e) {
			// TODO: log error
			response = malformedRequestError;
		}
		ws.send(JSON.stringify(response));
	});
});

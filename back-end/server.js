const WebSocket = require('ws');

const config = require('./config');
const methods = require('./methods');

const malformedRequestError = require('./errors/malformedRequestError');


const wss = new WebSocket.Server({
	port: config.port,
	clientTracking: true,
});

const matches = {};
const matchesContext = {
	addMatch: (newMatch, matchCode) => {
		matches[matchCode] = newMatch;
		return newMatch;
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
						const replyMessage = JSON.stringify(messageJSON);
						ws.send(replyMessage);
					} catch(e) {
						console.error('Error encoding response message', e);
					}
				},
				...matchesContext,
			});
		} catch(e) {
			console.error('Error processing client request', e);
			response = malformedRequestError;
		}
		ws.send(JSON.stringify(response));
	});
});

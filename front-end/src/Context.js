import config from './config';

import ModelStore from './stores/ModelStore';
import createViewStore from './stores/ViewStore';

import WsRequestService from './services/WsRequestService';
import WsListenerService from './services/WsListenerService';

function createContext() {
	const context = {};
	
	context.webSocket = new WebSocket(config.serverURL);

	context.wsRequestService = WsRequestService.create({}, context);
	context.wsListenerService = WsListenerService.create({}, context);

	context.modelStore = ModelStore.create({}, context);
	context.viewStore = createViewStore(context);

	window.viewStore = context.viewStore;

	return context;
}

export default createContext;

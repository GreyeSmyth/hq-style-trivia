import ModelStore from './stores/ModelStore';
import createViewStore from './stores/ViewStore';

import WsRequestService from './services/WsRequestService';
import WsListenerService from './services/WsListenerService';

function createContext() {
	const context = {};
	
	context.webSocket = new WebSocket('ws://localhost:8000');

	context.wsRequestService = WsRequestService.create({}, context);
	context.wsListenerService = WsListenerService.create({}, context);

	context.modelStore = ModelStore.create({}, context);
	context.viewStore = createViewStore(context);

	return context;
}

export default createContext;

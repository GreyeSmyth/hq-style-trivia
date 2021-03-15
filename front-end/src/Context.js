import ModelStore from './stores/ModelStore';
import WsRequestService from './services/WsRequestService';

function createContext() {
	const context = {};

	context.webSocket = new WebSocket('ws://localhost:8000');
	context.modelStore = ModelStore.create({}, context);
	context.wsRequestService = WsRequestService.create({}, context);

	return context;
}

export default createContext;

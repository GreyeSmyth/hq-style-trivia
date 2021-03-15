import { types } from 'mobx-state-tree';


const Player = types
	.model('Player', {
		id: types.identifier,
	});

export default Player;

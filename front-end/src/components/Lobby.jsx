import React from 'react';
import { observer } from 'mobx-react';

import MenuButton from './MenuButton';


function Lobby({ viewModel }) {
	const {
		shouldDisplayRemainingPlayers,
		remainingPlayersNeeded,
		returnToMainMenu,

		countdownValue,
	} = viewModel;
	
	return shouldDisplayRemainingPlayers
		? <>
			<p>{'Waiting for other players to join...'}</p>
			<p>{`${remainingPlayersNeeded} more players required to start`}</p>
			<MenuButton onClick={returnToMainMenu}>
				Return to menu
			</MenuButton>
		</>
		: <>
			<p>{`Match begins in ${countdownValue} seconds`}</p>
		</>;
}



export default observer(Lobby);

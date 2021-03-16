import React from 'react';
import { observer } from 'mobx-react';
import styled, { keyframes } from 'styled-components';

import MainMenu from './MainMenu';
import Lobby from './Lobby';
import AnswerChoices from './AnswerChoices';

import spinner from '../static/Spinner.svg';


function RootComponent({ viewStore }) {
	const {
		isMainMenuActive,
		mainMenu,
		isLobbyActive,
		lobby,
		areAnswerChoicesActive,
		answerChoices,
	} = viewStore;

	if (isMainMenuActive || isLobbyActive) {
		return <>
            <AppLogo src={spinner} alt="logo" />
			{
				isMainMenuActive
					? <MainMenu viewModel={mainMenu} />
					: <Lobby viewModel={lobby} />
			}
		</>;
	} else if (areAnswerChoicesActive) {
		return <AnswerChoices viewModel={answerChoices} />;
	}
}

const logoSpin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
const AppLogo = styled.img`
    height: 10vmin;
    pointer-events: none;
  
    @media (prefers-reduced-motion: no-preference) {
        animation: ${logoSpin} infinite 20s linear;
    }
`;

export default observer(RootComponent);

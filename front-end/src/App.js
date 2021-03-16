import { useState } from 'react';
import styled from 'styled-components';

import createContext from './Context';

import RootComponent from './components/RootComponent';


function App() {
    const [ context ] = useState(createContext);

    return (
        <AppContainer>
            <RootComponent viewStore={context.viewStore} />
        </AppContainer>
    );
}

const AppContainer = styled.div`
    text-align: center;
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

export default App;

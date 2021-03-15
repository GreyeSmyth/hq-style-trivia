import styled, { keyframes } from 'styled-components';

import spinner from './static/Spinner.svg';


function App() {
  return (
    <AppContainer>
      <AppHeader>
        <LogoContainer>
            <AppLogo src={spinner} alt="logo" />
            <LogoText>GS</LogoText>
        </LogoContainer>
        <p>Hello world, and welcome to GS Trivia!</p>
      </AppHeader>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const LogoContainer = styled.div`
  position: relative;
`;

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;
  
  @media (prefers-reduced-motion: no-preference) {
    animation: ${logoSpin} infinite 20s linear;
  }
`;

const LogoText = styled.h1`
  font-size: 150px;
  position: absolute;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AppLink = styled.a`
  color: #61dafb;
`;

const InlineCode = styled.code`
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
`;

export default App;

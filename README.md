
# GS Trivia

A multiplayer trivia app in the style of HQ trivia. Answer as many questions as you can, but get one wrong and you're eliminated! The game continues until a single winner is left.

The game consists of a React-based web app which communicates via websocket with a backend server. You must have Node.js installed to run both components (https://nodejs.org/en/download/). Once they are installed and running, you can create or join a match by navigating to the frontend's URL.

## Backend setup

From the `back-end` directory, run
```
npm install
npm start
```
to install dependencies, then launch the game server. By default, it will listen at http://localhost:8000.

**Backend config**
The `config.js` file in the `back-end` directory can be edited to tweak the server's behavior. The parameters are as follows:
 * `port` - The port to listen on.
 * `minPlayers` - The minimum number of players for a match. The match will count down and start automatically once this threshold is reached.
 * `matchStartDelay` - The delay between reaching the minimum player threshold and the start of a match, in milliseconds.
 * `roundStartDelay` - The interval between game rounds, in milliseconds.
 * `timeToAnswer` - The amount of time players are given to answer a question, in milliseconds.
 * `roundResultsLength` - The amount of time that a round's results are displayed for.
 * `fallbackQuestion` - A default question used if the server is unable to reach the trivia API, as an object with the properties:
	* `question` - A string containing the question.
	* `correctAnswer` - A string containing the correct answer.
	* `incorrectAnswers` - An array of strings, each containing an incorrect answer.
 * `questionApiURL` - A URL to fetch trivia questions from. By default, the app uses the [Open Trivia DB](https://opentdb.com/)


## Frontend setup

From the `front-end` directory, run
```
npm install
npm start
```
to install dependencies, then launch the app's web server. It will serve the app at http://localhost:3000.

**Frontend config**
The `front-end` directory has its own `config.js` file:
 * `serverURL` - The URL of a backend server instance


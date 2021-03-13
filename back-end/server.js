const express = require('express');


const app = express();
const port = 8000;

app.use(express.json());
app.use('/', require('./controllers'));

app.listen(port, () => {
	console.log(`Trivia app backend listening at http://localhost:${port}`);
});

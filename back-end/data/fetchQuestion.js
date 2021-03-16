const fetch = require('node-fetch');


async function fetchQuestion() {
    let question = {
        question: 'Why did Constantinople get the works?',
        correct_answer: 'That\'s nobody\'s business but the Turks',
        incorrect_answers: [
            'Even old New York was once New Amsterdam',
            'Why they changed it, I can\'t say',
            'People just liked it better that way',
        ],
    };

    const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    try {
        responseBody = await response.json();
        question = responseBody.results[0];
    } catch(e) {
		console.error('Error fetching question', e);
    }

	return question;
}

module.exports = fetchQuestion;

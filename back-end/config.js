module.exports = {
	port: 8000,
	
    minPlayers: 2,

    matchStartDelay: 5000,
    roundStartDelay: 2000,
    timeToAnswer: 10000,
    roundResultsLength: 3000,

    fallbackQuestion: {
        question: 'Why did Constantinople get the works?',
        correctAnswer: 'That\'s nobody\'s business but the Turks',
        incorrectAnswers: [
            'Even old New York was once New Amsterdam',
            'Why they changed it, I can\'t say',
            'People just liked it better that way',
        ],
    },
    questionApiURL: 'https://opentdb.com/api.php?amount=1&type=multiple',
};

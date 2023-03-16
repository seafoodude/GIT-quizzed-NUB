// var startButton;
// var quizScreen;

// var duration = 20;
// var countdown = document.getElementById('time');

// var timer = setInterval(() => {
//     countdown.textContent = duration;
//     duration--;

//     if (duration ===0) {
//         clearInterval(timer);
//         countdown.innerHTML = "Time's up!";
//     }
// }, 1000);

var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "JavaScript",
        choice2:"terminal",
        choice3: "terminal / bash",
        choice4: "console.log",
        answer: 4,
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        choice1: "booleans",
        choice2: "numbers and strings",
        choice3: "other arrays",
        choice4: "all of the above",
        answer: 4,
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choice1: "commas",
        choice2:"curly brackets",
        choice3: "quotes",
        choice4: "parentheses",
        answer: 3,
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        choice1: "quotes",
        choice2:"curly brackets",
        choice3: "parentheses",
        choice4: "square brackets",
        answer: 2,
    }
];

var SCORE_POINTS = 100;
var MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('./end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) {
            return;
        }

        acceptingAnswers = false;
        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset['number'];

        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        // score increment NEEDS TO BE CHANGED TO A TIMER AND DECREMENT
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000)
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
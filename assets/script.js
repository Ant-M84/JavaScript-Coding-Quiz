var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer");
var containerEl = document.querySelector(".container");
var nameScore = document.querySelector("#nameScore");
var secondsLeft = 40;
var correctAnswers = 0;
var questions = [
        {
        question: "What is 'CSS' an acronym for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true}, 
            { text: "Counter-Strike Source", correct: false},
            { text: "Caffeine Selection System", correct: false},
            ]
        },
        { 
        question: "What does 'HT' in HTML stand for?",
        answers: [
            { text: "Hang-Time", correct: false},
            { text: "Hold-Tight", correct: false},
            { text: "Hyper-Text", correct: true},
            ]
        },
        { 
        question: "What does 'DOM' stand for?",
        answers: [
            { text: "Dirty Old Man", correct: false},
            { text: "Document Object Model", correct: true},
            { text: "Document of Module", correct: false},
            ]
        },
        { 
        question: "Which of the following is not an attribute?",
        answers: [
            { text: "Img", correct: false},
            { text: "Ball", correct: true},
            { text: "Href", correct: false},
            ]
        }
    ];

var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
let currentQuestionIndex = 0;

scoreHistory();
startButton.addEventListener("click", () => {
    startButton.style.visibility = "hidden";
    startQuiz();
});


function startTimer() {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;
            if (secondsLeft === 0) {
                clearInterval(timeInterval);
                var nameScore = ("Fail! - " + secondsLeft);
                localStorage.setItem("nameScore", JSON.stringify(nameScore));
                location.reload();
            }
    }, 1000);
}

function startQuiz() {
    currentQuestionIndex = 0;
    showQuestion()
    startTimer();
}

function showQuestion () {
    resetForm();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNum = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNum + ". " +currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersEl.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
         button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if (!isCorrect) {
        selectedBtn.classList.add("incorrect");
        secondsLeft = secondsLeft - 3;
        if(secondsLeft <= 0){
            timerEl.textContent = "";
            quizFinish();
        }
    }else{
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length) {
            showQuestion();            
        }else{
            timerEl.style.visibility = "hidden";
            quizFinish();
        } 
    }
}

function quizFinish() {
    containerEl.textContent = "";
    var name = prompt("Please enter your name to register your score.");
    var nameScore = (name + " - " + secondsLeft);
    localStorage.setItem("nameScore", JSON.stringify(nameScore));
    displayScore();
}

function displayScore() {
    var highscore = JSON.parse(localStorage.getItem("nameScore"));
    document.querySelector("#nameScore").textContent = highscore;
    location.reload();
}

function scoreHistory() {
    var highscore = JSON.parse(localStorage.getItem("nameScore"));
    document.querySelector("#nameScore").textContent = highscore;
}

function resetForm() {
    while(answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild);
    }
}


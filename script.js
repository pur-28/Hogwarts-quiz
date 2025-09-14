let questions = [
    {
        numb: 1,
        question: "What is the name of Harry Potter's pet owl?",
        answer: "Hedwig",
        options: ["Hedwig", "Crookshanks", "Scabbers", "Fawkes"]
    },
    {
        numb: 2,
        question: "Who is the author of the Harry Potter series?",
        answer: "J.K. Rowling",
        options: ["Stephen King", "J.R.R. Tolkien", "George R.R. Martin", "J.K. Rowling"]
    },
    {
        numb: 3,
        question: "What house at Hogwarts does Harry belong to?",
        answer: "Gryffindor",
        options: ["Slytherin", "Ravenclaw", "Gryffindor", "Hufflepuff"]
    },
    {
        numb: 4,
        question: "What is the name of the Weasley's house?",
        answer: "The Burrow",
        options: ["12 Grimmauld Place", "The Burrow", "Shell Cottage", "Godric's Hollow"]
    },
    {
        numb: 5,
        question: "Who is the headmaster of Hogwarts when Harry first arrives?",
        answer: "Albus Dumbledore",
        options: ["Severus Snape", "Minerva McGonagall", "Albus Dumbledore", "Rubeus Hagrid"]
    },
    {
        numb: 6,
        question: "What spell is used to disarm an opponent?",
        answer: "Expelliarmus",
        options: ["Lumos", "Expelliarmus", "Alohomora", "Expecto Patronum"]
    },
    {
        numb: 7,
        question: "What position does Harry play on his Quidditch team?",
        answer: "Seeker",
        options: ["Keeper", "Chaser", "Beater", "Seeker"]
    },
    {
        numb: 8,
        question: "What is the name of the mirror that shows a person's deepest desire?",
        answer: "Mirror of Erised",
        options: ["Mirror of Erised", "Mirror of Desire", "Mirror of Reflections", "Mirror of Secrets"]
    },
    {
        numb: 9,
        question: "Who kills Dumbledore?",
        answer: "Severus Snape",
        options: ["Draco Malfoy", "Voldemort", "Bellatrix Lestrange", "Severus Snape"]
    },
    {
        numb: 10,
        question: "What platform at King's Cross station do students use to board the Hogwarts Express?",
        answer: "Platform 9¾",
        options: ["Platform 10", "Platform 9¾", "Platform 8", "Platform 11"]
    }
];

// Select elements
const startBtn = document.querySelector(".startbtn");
const infoBox = document.querySelector(".infobox");
const exitBtn = infoBox.querySelector(".quit");
const continueBtn = infoBox.querySelector(".restart");
const quizBox = document.querySelector(".quizbox");
const resultBox = document.querySelector(".resultbox");
const optionList = document.querySelector(".option-list");
const timeText = document.querySelector(".timer-text");
const timeCount = document.querySelector(".timer-sec");
const timeLine = document.querySelector(".time-line");
const nextBtn = document.querySelector(".next-btn");
const questionCounter = document.querySelector(".total-questions");
const scoreText = document.querySelector(".score-text");
const houseText = document.querySelector(".house-text");

// Quiz variables
let timeValue = 15;
let questionCount = 0;
let questionNumb = 1;
let counter;
let counterLine;
let widthValue = 0;
let userScore = 0;

// Start Quiz
startBtn.onclick = () => {
    infoBox.classList.add("activeInfo");
    startBtn.style.display = "none";
};

// Exit Quiz
exitBtn.onclick = () => {
    infoBox.classList.remove("activeInfo");
    startBtn.style.display = "block";
};

// Continue to Quiz
continueBtn.onclick = () => {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
};

// Next Question
nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        queCounter(questionNumb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        nextBtn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
};

// Show Questions
function showQuestions(index) {
    const queText = document.querySelector(".question-text");
    let queTag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
    let optionTag = questions[index].options.map(option => `<li class="option">${option}</li>`).join("");
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;

    const options = optionList.querySelectorAll(".option");
    options.forEach(option => {
        option.setAttribute("onclick", "optionSelected(this)");
    });
}

// Option Selected
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAns === correctAns) {
        userScore += 1;
        answer.classList.add("correct");
    } else {
        answer.classList.add("incorrect");

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent === correctAns) {
                optionList.children[i].classList.add("correct");
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    nextBtn.classList.add("show");
}

// Timer
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";

            let correctAns = questions[questionCount].answer;
            let allOptions = optionList.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent === correctAns) {
                    optionList.children[i].classList.add("correct");
                }
                optionList.children[i].classList.add("disabled");
            }
            nextBtn.classList.add("show");
        }
    }
}

// Timeline
function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

// Question Counter

function queCounter(index) {
    let totalQueCounTag = `<span>${index} of ${questions.length} Questions</span>`;
    questionCounter.innerHTML = totalQueCounTag;
}


// Show Result
function showResult() {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");

    let scoreTag = `<span>You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;

    // House assignment
    let house = "";
    let crest = "";
    if (userScore >= 8) {
        house = "Gryffindor";
        crest = "🦁";
        houseText.className = "house-text gryffindor";
    } else if (userScore >= 6) {
        house = "Slytherin";
        crest = "🐍";
        houseText.className = "house-text slytherin";
    } else if (userScore >= 4) {
        house = "Ravenclaw";
        crest = "🦅";
        houseText.className = "house-text ravenclaw";
    } else {
        house = "Hufflepuff";
        crest = "🦡";
        houseText.className = "house-text hufflepuff";
    }

    houseText.innerHTML = `<div class="house-crest">${crest}</div>You belong to <strong>${house}</strong>!`;

    // Confetti
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });
}

// Replay Quiz
const restartQuiz = resultBox.querySelector(".restart");
restartQuiz.onclick = () => {
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    timeValue = 15;
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(questionCount);
    queCounter(questionNumb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    nextBtn.classList.remove("show");
};

// Quit Quiz
const quitQuiz = resultBox.querySelector(".quit");
quitQuiz.onclick = () => {
    window.location.reload();
};

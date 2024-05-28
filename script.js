let startQuix = () => {
  let startQuiz = (document.getElementById("start-quiz").style.display =
    "none");

  let quizGame = (document.getElementById("quiz-game").style.display = "block");
  quizGame.classList.add("app2");
  console.log("helo");
};

let questions = [
  //1st question
  {
    question: "which is the largest animal in the world ?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Tiger", correct: false },
      { text: "Elephant", correct: true },
      { text: "Graffe", correct: false },
    ],
  },
  //2nd question
  {
    question: "What is the process by which make their own food from sunlight?",
    answers: [
      { text: "Respiration", correct: false },
      { text: "Photosynthesis", correct: true },
      { text: "Decomposition", correct: false },
      { text: "Fermentation", correct: false },
    ],
  },
  //3rd question
  {
    question: "What is the most common type of database management system ?",
    answers: [
      { text: "Hierarchical", correct: false },
      { text: "Network", correct: false },
      { text: "Object-Oriented", correct: false },
      { text: "Relational", correct: true },
    ],
  },
  //4th question
  {
    question:
      "Which programming language is known for its platform independence ?",
    answers: [
      { text: "Python", correct: false },
      { text: "Java", correct: true },
      { text: "JavaScript", correct: false },
      { text: "PHP", correct: false },
    ],
  },
  //5th question
  {
    question:
      "What is the term for a computer program that can perform tasks automatically ?",
    answers: [
      { text: "Software", correct: true },
      { text: "Hardware", correct: false },
      { text: "Program", correct: false },
      { text: "Robot", correct: false },
    ],
  },
];

// console.log(questions.length);

let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-btn");
let nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

//---1st part
function showQuestion() {
  resetState();
  //--show question
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  //----show all answers
  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

//---2nd part
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
//------popup
let popupContainer = document.getElementById("popup-containers");
let popupMessage = document.getElementById("popup-message");

let btnPopup = () => {
  popupContainer.classList.remove("active");
};

function Timer() {
  popupContainer.classList.remove("active");
  console.log("i am a timmer");
}
//---3rd
function selectAnswer(abc) {
  let selectedBtn = abc.target;
  let isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    btnPopup();
    popupContainer.classList.add("active");
    popupMessage.innerHTML = " YOUR CHOISE IS CORRECT";
    setTimeout(Timer, 2000);
    score++;
  } else {
    btnPopup();
    setTimeout(Timer, 2000);
    popupContainer.classList.add("active");
    popupMessage.innerHTML = "YOUR CHOISE IS WRONG";
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
//last part-----
let loser = document.getElementById("congulate-loser")
let winner = document.getElementById("congulate-winner")

function congulate(){
  loser.style.opacity = "0"
  loser.style.display = "none"
  winner.style.opacity = "0"
  winner.style.display = "none"
}
function showScore() {
  resetState();
  questionElement.innerHTML = `you marks ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  if(score >= 3){
    winner.style.opacity = "1"
    winner.style.display = "block"
  }else{
    loser.style.opacity = "1"
    loser.style.display = "block"
  }
  setTimeout(congulate,2000)
}


//---5th part---
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
//--4th check question and next question
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();

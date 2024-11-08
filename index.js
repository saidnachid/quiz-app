// Array of quiz questions
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Makeup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    correctAnswer: "font-size",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    question: "Which JavaScript method is used to find an element by ID?",
    options: [
      "getElementById()",
      "querySelector()",
      "findById()",
      "selectById()",
    ],
    correctAnswer: "getElementById()",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const retryBtn = document.getElementById("retry-btn");

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionEl.innerHTML = currentQuestion.question;
  optionsEl.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    let button = document.createElement("button");
    button.innerHTML = option;
    button.onclick = function () {
      nextBtn.classList.remove("hidden");
      button.classList.add('active')
      document.querySelectorAll('#options button').forEach(button=>button.classList.add('disabled'))
      selectAnswer(button,option);
    };
    optionsEl.appendChild(button);
  });
}

function selectAnswer(element,selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (selectedOption === currentQuestion.correctAnswer) {
    element.classList.add('correct')
    score++;
  }else{
    element.classList.add('wrong')
    document.querySelectorAll('#options button').forEach(button=>{
      if (button.innerHTML===currentQuestion.correctAnswer) {
        button.classList.add('correct')
      }
    })
  }
}

function showResult() {
  resultEl.classList.remove("hidden");
  document.querySelector(".quiz-container").classList.add("hidden");
  scoreEl.innerHTML = `${score}/${quizQuestions.length}`;
}

displayQuestion();

nextBtn.addEventListener("click", () => {
  nextBtn.classList.add("hidden");

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    showResult();
  }
});

function resetQuiz() {
  currentQuestionIndex=0
  score=0
  resultEl.classList.add("hidden");
  document.querySelector(".quiz-container").classList.remove("hidden");
  displayQuestion()
}

retryBtn.addEventListener('click',resetQuiz)
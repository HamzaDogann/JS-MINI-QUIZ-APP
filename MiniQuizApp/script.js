import questions from "./questions.json" assert { type: "json" };

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("questionNumber")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Sonraki";
  questionElement.style.textAlign = "left";
  showQuestion();
}


function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionNumber.innerHTML = `${questionNo}/${questions.length}`;
  questionElement.innerHTML = `${questionNo} - ${currentQuestion.question}`;

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);

  })

}

function resetState() {
 
  nextButton.disabled=true;
  nextButton.style.background="gray";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  nextButton.disabled=false;
  nextButton.style.background="#3c91ff";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }
  else {
    selectedBtn.classList.add('incorrect');
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  })

  nextButton.style.display = "block";
  nextButton.disabled=false;
}

function showScore() {
  resetState();
  questionElement.innerHTML = `
  Toplam Soru =  ${questions.length} </br>
  Doğru Cevap = ${score} </br>
  Yanlış Cevap = ${questions.length - score}
  `
  questionElement.style.textAlign = "center";
  nextButton.innerHTML = "Tekrar Çöz";
  nextButton.style.background="#3c91ff";
  nextButton.style.display = "block";
  nextButton.disabled=false;

}

function handleNextButton() {

  currentQuestionIndex++;
 
 if (currentQuestionIndex < questions.length) {
    showQuestion();
  }
  else {
    showScore();
  }

}


nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  }
  else {
    startQuiz();
  }
})

startQuiz();
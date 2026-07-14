const generateBtn = document.getElementById('generate-btn')
const courseSelect = document.getElementById('course-select')
const countSelect = document.getElementById('count-select')
const quizSetup = document.getElementById('quiz-setup')
const quizActive = document.getElementById('quiz-active')
const quizResults = document.getElementById('quiz-results')
const questionText = document.getElementById('question-text')
const optionsCont = document.getElementById('options-cont')
const questionNum = document.getElementById('question-num')
const nextBtn = document.getElementById('next-btn')
const resultsCont = document.getElementById('results-cont')
const retryBtn = document.querySelector('.retry-btn')
const options = document.querySelectorAll('.options')


let questions = []
let currentIndex = 0
let score = 0
let userAnswers = []

 generateBtn.addEventListener('click', async () => {
  const selectedCourse = courseSelect.value
  const selectedNum = countSelect.value
  generateBtn.textContent ='generating...'

  const ask = await fetch( `/api/generate-quiz`,
      {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ course:selectedCourse, count: selectedNum })
      }
  )

 const data = await ask.json()
 questions = data.questions

 quizSetup.style.display ='none'
  
 quizActive.style.display = ''
 generateBtn.textContent = 'GENERATE QUESTION'
  renderQuestion()
});


function renderQuestion () {
  const currentquest = questions[currentIndex];

  questionNum.textContent = `${currentIndex + 1}/${questions.length}`

  questionText.textContent = currentquest.question;
  
  optionsCont.innerHTML = '';

  currentquest.options.forEach(option => {
   const opt = document.createElement('div');
   opt.textContent = option
   optionsCont.appendChild(opt)

   opt.addEventListener('click', () => {
    userAnswers.push(opt.textContent)

    if(opt.textContent === currentquest.answer){
      opt.style.color = "green"
    } else{
      opt.style.color = "red"
    }

    document.querySelectorAll('#options-cont div').forEach(op => op.style.pointerEvents = 'none');
   });
  });
}


/************************NEXT BTN***********************/
nextBtn.addEventListener('click', ()=>{
  currentIndex += 1

  if(currentIndex < questions.length){
    renderQuestion()
  } else {
    quizActive.style.display = 'none';
    quizResults.style.display = '';
    showResults()
  }
})

 function showResults() {
  questions.forEach((quest, i) => {
     resultsCont.innerHTML = ``
    if (questions[i].answer === userAnswers[i]){
      score += 1
    }
   
    const card = document.createElement('div')
    card.innerHTML = ``
    <p>${questions[i].question}</p>
    <p style="color: ${userAnswers[i] === questions[i].answer ? 'green' : 'red'}">
        Your answer: ${userAnswers[i]}
    </p>
    <p style="color: green">Correct: ${questions[i].answer}</p>
`
    resultsCont.appendChild(card)
  })
const scoreDiv = document.createElement('div')
scoreDiv.textContent = `You scored ${score} out of ${questions.length}`
resultsCont.appendChild(scoreDiv)
}

/***********************RETRY BTN***********************/
retryBtn.addEventListener('click', ()=>{
 currentIndex = 0
 score = 0
 userAnswers = []

 quizResults.style.display = "none"
 quizSetup.style.display = "none"
});


/*************************results************************/

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
 const questions = data.questions


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
   opt.textContent= option
   optionsCont.appendChild(opt)
  });

}

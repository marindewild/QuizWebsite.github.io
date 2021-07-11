const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const ProgressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const HealthBarFull = document.querySelector('#healthBarFull');
const FutureBarFull = document.querySelector('#futureBarFull');


let currectQuestion = {}
let acceptingAnswers = true
let score = 0
let health = 100
let future = 100
let questionCounter = 0
let availableQuestions = {}
let vasteLasten = -703
let healthAfbreuk = 0
let loon = 0

let questions = [
    {
        question: "Blijf je op school of ga je werken",
        choice1: 'Ik blijf op school. Ik ontvang een tegemoetkoming van de overheid van €373 per maand. Ik behoud de optie om te gaan studeren',
        choice2: 'Ik ga werken. Als 18 jarige verdien ik met een voltijds baan €850 per maand. Ik kan alleen werk doen waar geen startkwalificatie voor nodig is. Dit werk is vaak zwaar en dit zal ik elke maand in mijn gezonheid terugzien. Ook kan ik zonder startkwalificatie geen vervolgopleiding doen',
        budget1: 373,
        budget2: 850,
        health1: 0,
        health2: 0,
        future1: 0,
        future2: -50
    },
    {
        question: "Je laptop is stuk",
        choice1: 'De laptop heb ik nodig om me te ontwikkelen. Ik koop een nieuwe. Kosten 350 euro',
        choice2: 'Ik heb geen budget voor een nieuwe laptop dus ik zal het even zonder moeten doen. Ik koop geen nieuwe laptop',
        budget1: -350,
        budget2: 0,
        health1: 0,
        health2: 0,
        future1: 10,
        future2: -15
    },
    {
        question: "Ga je mee uiteten",
        choice1: 'Ja, sociale contacten onderhouden is belangrijk voor mijn gezondheid en mijn toekomst. kosten: 25 euro',
        choice2: 'Nee, dat past niet binnen mijn budget',
        budget1: -25,
        budget2: 0,
        health1: +5,
        health2: -5,
        future1: +5,
        future2: -5
    },
    {
        question: "Je hebt steeds last van buikpijn",
        choice1: 'De huisarts wil wat testjes doen. Mijn gezondheid is belangrijk dus ik volg het advies van de arts, kosten eigen risico: 385 euro',
        choice2: 'Ik heb geen budget en tijd om dit nu te laten doen. Ik laat de testen niet doen',
        budget1: -385,
        budget2: 0,
        health1: 0,
        health2: -30,
        future1: 0,
        future2: -20
    },
    {
        question: "Werken op een festival",
        choice1: 'Ik ga dit weekend werken op het festival. Ik verdien 120 euro. Ik heb hierdoor 12 dagen lang geen vrije dag wat niet goed is voor mijn gezondheid',
        choice2: 'Ik ga niet werken.',
        budget1: 120,
        budget2: 0,
        health1: -10,
        health2: 0,
        future1: 0,
        future2: 0
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0;
    score = 0.0; //budget
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        localStorage.setItem('mostRecentHealth', health)
        localStorage.setItem('mostRecentFuture', future)


        return window.location.assign('./end.html')
    }
    HealthBarFull.style.width = `${health}%`
    FutureBarFull.style.width = `${future}%`

    
    currentQuestion = availableQuestions[questionCounter]
    question.innerText = currentQuestion.question
    
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    
    questionCounter++
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptinAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        if (selectedAnswer == 1){
            health += currentQuestion.health1
            future += currentQuestion.future1
            if (questionCounter == 1) {
                loon += currentQuestion.budget1
            }
            else {
                incrementScore(currentQuestion.budget1)
            }
        }
        if (selectedAnswer == 2){
            health += currentQuestion.health2
            future += currentQuestion.future2
            if (questionCounter == 1) {
                loon += currentQuestion.budget2
                healthAfbreuk -= 5
            }
            else {
                incrementScore(currentQuestion.budget2)
            }
        }

        // selectedChoice.parentElement.classList.add(classToApply)
        // setTimeout(() => selectedChoice.parentElement.classList.remove(classToApply))
        getNewQuestion()
    }, 1000)
})

incrementScore = num =>  {
    score += num
    scoreText.innerText = `€${score}`
}

incrementHealth = num => {
    health += num
    HealthBarFull.style.width = `${health}%`
}

incrementFuture = num => {
    future += num
    FutureBarFull.style.width = `${future}%`
}

startGame()




const pages = document.querySelector('.pages');
const locale = window.navigator.language || 'en-us';


let date = new Date();  
let dayNum = date.getDate();
let month = date.getMonth();
let dayName = date.toLocaleString(locale, { weekday: 'long' });
let monthName = date.toLocaleString(locale, { month: 'long' });
let year = date.getFullYear();

function daysInMonth (month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getNewDate () {
  if (dayNum < daysInMonth(month, year)) {
    dayNum++;
  } else {
    dayNum = 1;
  } 
  if (dayNum === 1 && month < 11) {
    month++;
  } else if (dayNum === 1 && month === 11) {
    month = 0;
  }
  if (dayNum ===1 && month === 0) {
    year++;
  }
  if (dayNum == 1) {
    incrementScore(vasteLasten)
  }
  if (dayNum == 15) {
    incrementScore(loon)
    incrementHealth(healthAfbreuk)
    console.log(health)
  }
  if (dayNum == 25 && score < 0) {
      incrementScore(Math.round(score/10 * -1))
      incrementHealth(-3)
      incrementFuture(-3)
  }
  const newDate = new Date(year, month, dayNum);
  monthName = newDate.toLocaleString('en-us', { month: 'long' });
}

function handleClick () {
  getNewDate();
  updateCalendar();
}

function updateCalendar () {
  while (pages.firstChild){
    pages.removeChild(pages.firstChild);
  }
  renderPage();
}

function renderPage () {
  const newPage = document.createElement('div');
  newPage.classList.add('page');
  newPage.innerHTML = `
    <p class="month">${monthName}</p>
    <p class="day">${dayNum}</p>
    <p class="year">${year}</p>
  `;
  pages.appendChild(newPage);
}


window.onload = () => {
  renderPage();
  setInterval(handleClick, 500);
}


const scoreText = document.querySelector('#score')
const healthText = document.querySelector('#healthBarFull')
const futureText = document.querySelector('#futureBarFull')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const mostRecentHealth = localStorage.getItem('mostRecentHealth')
const mostRecentFuture = localStorage.getItem('mostRecentFuture')


scoreText.innerText = `€${mostRecentScore}`
healthText.style.width = `${mostRecentHealth}%`
futureText.style.width = `${mostRecentFuture}%`

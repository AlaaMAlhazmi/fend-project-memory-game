"use strict";
/*
 * Create a list that holds all of your cards
 */
let openCards = [];
let movesCounter = 0;
let matchedCounter = 0;
let time = 0;
let IntervalId;
let timerIsOn = false;

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function respondToTheClick(evt) {
  if(evt.target.className === 'card'){
    if(!timerIsOn){
      timer();
    }
    if (openCards.length < 2){
      displaySymbol(evt);
      addCardToList(evt);
      if(openCards.length >1){
        if (openCards[0].classList[1] === openCards[1].classList[1]){
          match();
          matchedCounter++;
          incrementMovesCounter();
          if (matchedCounter === 8){
            setTimeout(won, 400);
          }
        }else{
          missmatch();
          setTimeout(hide, 700);
          incrementMovesCounter();
        }
      }
    }
  }
}

//Sisplay the card symbol
function displaySymbol(evt){
    evt.target.classList.add('open', 'show');
}

// Add card to openCards list
function addCardToList(evt){
    openCards.push(evt.target.firstElementChild);
}

//Match functionality
function match(){
  openCards[0].parentElement.classList.add('match');
  openCards[1].parentElement.classList.add('match');
  //If cards match reinitialize cards list (to save memory)
  openCards = [];
}

//mismatch functionality
function missmatch(){
  openCards[0].parentElement.classList.add('missmatch');
  openCards[1].parentElement.classList.add('missmatch');
}

//Hide cards functionality
function hide(){
  openCards[0].parentElement.classList = "card";
  openCards[1].parentElement.classList = "card";
  openCards = [];
}

//Increment the moves counter And Stars
function incrementMovesCounter(){
  movesCounter++;
  document.querySelector('.moves').textContent = movesCounter;
  if(movesCounter === 16){
    document.querySelectorAll('.fa-star')[2].className = "fa fa-star-o";
  }else if (movesCounter === 24) {
    document.querySelectorAll('.fa-star')[1].className = "fa fa-star-o";
  }
}

//Winning functionality
function won(){
  document.querySelector('.messege').classList.add('show');
  document.querySelector('.time-results').innerHTML= "Your Time: "+ Math.floor(time/60)+":"+time % 60;
  document.querySelector('.moves-results').innerHTML= "Number of moves: " + movesCounter;
  const numberOfstars = document.querySelectorAll('.fa-star');
  document.querySelector('.stars-results').innerHTML= "Star Rating: " + numberOfstars.length;
  StopTimer();
}

//Timer functionality
function timer(){
  timerIsOn = true;
  IntervalId = setInterval(function () {
    time++;
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    document.querySelector('.timer').innerHTML = minutes+":"+seconds;
  }, 1000);
}

//Stop timer functionality
function StopTimer(){
  timerIsOn = false;
  clearInterval(IntervalId);
  document.querySelector('.timer').innerHTML = '0:00';
  time=0;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Shuffle cards on the page
function shuffleCards(){
  let symbols = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
  const listOfCards = symbols.concat(symbols);
  shuffle(listOfCards);
  const cards = document.querySelectorAll('.card');
  for (let i=0; i<cards.length; i++){
    cards[i].firstElementChild.classList = "fa "+ (listOfCards[i]);
  }
}

//Resetting Cards
function resetCards(evt){
  openCards = [];
  matchedCounter = 0;
  const cards = document.querySelectorAll('.card');
  for (let i=0; i<cards.length; i++){
    cards[i].className = 'card';
  }
  shuffleCards();
}

//Reset moves
function resetMovesAndStars(){
  //reset moves
  movesCounter = 0;
  document.querySelector('.moves').textContent = movesCounter;
  //reset stars
  const oStars = document.querySelectorAll('.fa-star-o')
  for (let i=0; i<oStars.length; i++){
    oStars[i].className = "fa fa-star";
  }
}

//Restart Game
function restartGame(){
  resetCards();
  resetMovesAndStars();
  if (document.querySelector('.messege').classList.contains('show'))
  {
      document.querySelector('.messege').classList.remove('show')
  }
  StopTimer();
}

///////////Code Sarts Here///////////////////

 shuffleCards();
const deck = document.querySelector('.deck');
deck.addEventListener('click', respondToTheClick);

const restart = document.querySelectorAll('.restart');
for (let i=0; i<restart.length; i++){
  restart[i].addEventListener('click', restartGame);
}

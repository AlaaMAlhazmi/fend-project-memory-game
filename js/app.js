/*
 * Create a list that holds all of your cards
 */
let openCards = [];


function respondToTheClick(evt) {
  if(evt.target.className === 'card'){
    displaySymbol(evt);
    addCardToList(evt);
  }
  if(openCards.length >1){
      if (openCards[0].classList[1] === openCards[1].classList[1]){
        match();
      }else {
        missmatch();
        setTimeout(hide, 700);
      }
    }
}

//Sisplay the card symbol
function displaySymbol(evt){
    evt.target.classList.add('open', 'show');
}

//Match function
function match(){
  openCards[0].parentElement.classList = "card match";
  openCards[1].parentElement.classList = "card match";
  //If cards match reinitialize cards list (to save memory)
  openCards = [];
}

//mismatch function
function missmatch(){
  openCards[0].parentElement.classList = "card missmatch";
  openCards[1].parentElement.classList = "card missmatch";
}

//Hide function
function hide(){
  openCards[0].parentElement.classList = "card";
  openCards[1].parentElement.classList = "card";
  openCards = [];
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

// Add card to openCards list
function addCardToList(evt){
  openCards.push(evt.target.firstElementChild);
}


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
const deck = document.querySelector('.deck');
deck.addEventListener('click', respondToTheClick);

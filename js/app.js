/*
 * Create a list that holds all of your cards
 */

var state = {
    cardElements : document.getElementsByClassName('card'),
    shuffledDeck: [],
    openCards : [],
    numberOfMoves: 0,
    numberOfTotalCards: 16,
    numberOfMatchedCards:0,
    numberOfStars: 3
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle() {
    var array = state.cardElements;
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    state.shuffledDeck = array;
}

function clicked(){
    if (!this.classList.contains('open')) {
        var cardName = this.firstElementChild.getAttribute('class');
        if (!state.openCards.includes(cardName)) {
            this.classList.add('open', 'show');
            addToOpenCards(cardName);
            checkOpenCards();
        } else {
            newMatch(cardName);
        }
    } else {
        this.classList.remove('open', 'show');
        emptyOpenCards();
    }
}

function checkOpenCards() {
    if (state.openCards.length > 1 && state.openCards[0] !== state.openCards[1]) {
        inActivateAllCards();
        setTimeout(function(){
            for (var i = 0; i < state.cardElements.length; i++) {
                state.cardElements[i].classList.remove('open', 'show');
            }
            updateNumberOfMoves();
            activateAllCards();
        },500);
        state.openCards = [];
    }
}

function restart() {
    document.getElementById('deck').innerHTML = '';
    var html = '';
    debugger;
    for (var i = 0; i < state.shuffledDeck.length; i++) {
        html += "<li class='card'><i class=";
        html += state.shuffledDeck[i].firstElementChild.getAttribute('class');
        html += "'></i></li>";
    }
    document.getElementById('deck').innerHTML = html;
}

function updateNumberOfMoves() {
    state.numberOfMoves++;
    document.getElementById('numberOfMoves').innerHTML = state.numberOfMoves;
};

function addToOpenCards(cardName) {
    state.openCards.push(cardName);
}

function newMatch(cardName) {
    var matchedCards = document.getElementsByClassName(cardName);
    for(var i = 0; i < matchedCards.length; i++) {
        matchedCards[i].parentElement.classList.add('match');
        matchedCards[i].parentElement.classList.remove('open', 'show');
        matchedCards[i].parentElement.removeEventListener('click', clicked);
    }
    emptyOpenCards();
    updateNumberOfMoves();
};

function emptyOpenCards(){
    state.openCards = [];
}

function inActivateAllCards() {
    for(var i = 0; i < state.cardElements.length; i++) {
        state.cardElements[i].removeEventListener("click", clicked);
    }
};

function activateAllCards() {
    for(var i = 0; i < state.cardElements.length; i++) {
        if (!state.cardElements[i].parentElement.classList.contains('match')) {
            state.cardElements[i].addEventListener("click", clicked);
        }
    }
};


activateAllCards();
//document.getElementById('restart').addEventListener('click', restart);

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

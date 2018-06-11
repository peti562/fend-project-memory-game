

var state = {
    deck: ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'],
    cardElements : document.getElementsByClassName('card'),
    shuffledDeck: [],
    openCards : [],
    numberOfMoves: 0,
    numberOfTotalCards: 16,
    numberOfMatchedCards:0,
    numberOfStars: 3
};

function initBoard() {
    var board = document.getElementById('deck');
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    shuffle(state.deck);

    for(var i = 0; i < state.deck.length; i++) {
        var newCard = document.createElement('li');
        newCard.classList.add('card');
        newCard.innerHTML = '<i class="fa"></i>';
        newCard.firstElementChild.classList.add(state.deck[i]);
        board.appendChild(newCard);
    }
    activateAllCards();
};

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
    state.numberOfMatchedCards += 2;
    emptyOpenCards();
    updateNumberOfMoves();
    if (state.numberOfMatchedCards === state.numberOfTotalCards) {
        setTimeout(function(){
            alert('You won! You completed the board from '+state.numberOfMoves+' moves!');
        },500);

    }
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


initBoard();

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

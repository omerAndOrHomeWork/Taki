/**
 * @return {number}
 */
function changeColorOperation() {
    //hide = false
    //TODO: create 4 buttons and connect it to game(functionally)
    return 1;
}

/**
 * @return {boolean}
 */
function changeColorValidation(card) {
    return !card.isActive();
}

function numberOperation() {
    return 1;
}

function numberValidation(playerCard,lastCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());

}

function plusOperation() {
    return 1;
}

function plusValidation(lastCard,playerCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

function stopOperation() {
    return 2;
}

function stopValidation(lastCard,playerCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

/**
 * @return {number}
 */
function superTakiOperation() {
    return -1;
}

/**
 * @return {boolean}
 */
function superTakiValidation(card) {
    return !card.active;
}

/**
 * @return {number}
 */
function takiOperation() {
    return -1;
}

/**
 * @return {boolean}
 */
function takiValidation(lastCard,playerCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

function twoPlusOperation() {
    return 1;
}

function twoPlusValidation(lastCard,playerCard) {
    return (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

function pullApproval(cards, lastCard) {
    for(var i = 0; i < cards.length; ++i){
        if(cards[i].doValidation(lastCard))
            return false;
    }
    return true;
}

function takiModeChecker(cards) {
    var promote;
    var foundColor = false;
    for (var i = 0; i < cards.length; ++i) {
        if (cards[i].color === this.takiMode.color) {
            promote = 0;
            foundColor = true;
            break;
        }
    }
    if (!foundColor) {
        this.takiMode = null;
        promote = 1;
    }
    return promote;
}


function removeCard(cards, card) {
    for (var i = 0; i < cards.length; ++i) {
        if (cards[i] === card) {
            cards.splice(i, 1);
        }
    }
}

function searchCard(cards, id) {
    for (var i = 0; i < cards.length; ++i) {
        if (cards[i].getId() === id) {
            return cards[i];
        }
    }
    return null;
}

var enumCard = (function(){
    return {
        enumColor: Object.freeze({RED: 0, BLUE: 1, GREEN: 2, YELLOW: 3}),
        enumTypes: Object.freeze({
            STOP: 0, CHANGE_COLOR: 1, PLUS: 2, NUMBER: 3, TAKI: 4,
            SUPER_TAKI: 5, TWO_PLUS: 6
        }),
        enumPlayer: Object.freeze({PLAYER1: 0, COMPUTER: 1}), //help for extendable

        // enumColor: ["RED", "BLUE", "GREEN", "YELLOW"]
        // enumTypes: ["STOP", "CHANGE_COLOR", "PLUS", "NUMBER", "SUPER_TAKI", "TWO_PLUS"],
        dives: Object.freeze({
            PLAYER_CARDS: "playerCards", COMPUTER_CARDS: "computerCards",
            STOCK: "stock", OPEN_CARDS: "openCards"
        }),

        cssStyle: Object.freeze({
            OPEN_CARDS: 0, CLOSE_CARD: "closeCard"
        })
    }
})();

function getUniqueCss(color,type,separator){
    return color.concat(separator).concat(type);
}

function setCards(stock, cards) {
    for(var i = 0; i < cards.length; ++i){
        stock.push(cards[i]);
        cards[i].changeCss(true);
    }
}
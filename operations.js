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
function changeColorValidation(playerCard, lastCard) { //TODO:: CHECK IF WE CAN WITH ONE INPUT ELEMENT
    return !lastCard.isActive();
}

function numberOperation() {
    return 1;
}

function numberValidation(playerCard, lastCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.number === playerCard.number);
}

function plusOperation() {
    return 1;
}

function plusValidation(playerCard, lastCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

function stopOperation() {
    return 2;
}

function stopValidation(playerCard, lastCard) {
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
function superTakiValidation(playerCard, lastCard) {
    return !lastCard.active;
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
function takiValidation(playerCard, lastCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

function twoPlusOperation() {
    return 1;
}

function twoPlusValidation(playerCard, lastCard) {
    return (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

function pullApproval(cards, lastCard) {
    for(var i = 0; i < cards.length; ++i){
        if(cards[i].doValidation(lastCard))
            return false;
    }
    return true;
}

function takiModeChecker(cards, takiMode) {
    var foundColor = false;
    for (var i = 0; i < cards.length; ++i) {
        if (cards[i].getColor() === takiMode.getColor()) {
            foundColor = true;
            break;
        }
    }
    return foundColor;
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
        if (cards[i].getId().toString() === id) {
            return cards[i];
        }
    }
    return undefined;
}

var enumCard = (function(){
    return {
        enumColor: Object.freeze({RED: 0, BLUE: 1, GREEN: 2, YELLOW: 3}),
        enumTypes: Object.freeze({
            STOP: 0, CHANGE_COLOR: 1, PLUS: 2, NUMBER: 3, TAKI: 4,
            SUPER_TAKI: 5, TWO_PLUS: 6
        }),
        enumPlayer: Object.freeze({PLAYER1: 0, COMPUTER: 1}), //help for extendable

        dives: Object.freeze({
            PLAYER_CARDS: "playerCards", COMPUTER_CARDS: "computerCards",
            STOCK: "stockCards", OPEN_CARDS: "openCards", STOCK_PARENT: "stock"
        }),

        cssStyle: Object.freeze({
            OPEN_CARD: "openCard", CLOSE_CARD: "closeCard"
        }),

        images: Object.freeze({
            CLOSE_CARD: "../Taki/Images/other/close_card.png"
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
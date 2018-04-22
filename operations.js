/**
 * @return {number}
 */
function changeColorOperation(player, playerCard) {

    return player.selectAndPickColorOperation(playerCard);
/*
    var pickedColor = player.pickColor();
    playerCard.setColor(pickedColor);
    playerCard.setImage(getUniqueCss(Object.keys(enumCard.enumColor)[pickedColor],
        Object.keys(enumCard.enumTypes)[enumCard.enumTypes.CHANGE_COLOR],'_'));
    return enumCard.enumResult.SINGLE;
*/
}

/**
 * @return {boolean}
 */
function changeColorValidation(lastCard) { //TODO:: CHECK IF WE CAN WITH ONE INPUT ELEMENT
   return !lastCard.isActive();
}

function numberOperation() {
    return enumCard.enumResult.SINGLE;
}

function numberValidation(lastCard, playerCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.number === playerCard.number);
}

function plusOperation() {
    return enumCard.enumResult.CONTINUE_PLAYER_TURN;
}

function plusValidation(lastCard, playerCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

function stopOperation() {
    return enumCard.enumResult.DOUBLE;
}

function stopValidation(lastCard, playerCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

/**
 * @return {number}
 */
function superTakiOperation(player, playerCard, lastCard) {
    playerCard.setColor(lastCard.getColor());
    playerCard.setImage(getUniqueCss(Object.keys(enumCard.enumColor)[playerCard.getColor()],
        Object.keys(enumCard.enumTypes)[enumCard.enumTypes.TAKI],'_'));
    player.setTakiMode(card);
    return enumCard.enumResult.PLAYER_TURN_AGAIN;
}

/**
 * @return {boolean}
 */
function superTakiValidation(lastCard) {
    return !lastCard.isActive();
}

/**
 * @return {number}
 */
function takiOperation(player) {
    player.setTakiMode(card);
    return enumCard.enumResult.PLAYER_TURN_AGAIN;
}

/**
 * @return {boolean}
 */
function takiValidation(lastCard, playerCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

function twoPlusOperation(player, playerCard) {
    playerCard.setActive(true);
    return enumCard.enumResult.SINGLE;
}

function twoPlusValidation(lastCard, playerCard) {
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
            STOCK: "stockCards", OPEN_CARDS: "openCards", STOCK_PARENT: "stock",STATISTICS: "statistics",CLOCK:"gameClock"
        }),

        cssStyle: Object.freeze({
            OPEN_CARD: "openCard", CLOSE_CARD: "closeCard"
        }),

        images: Object.freeze({
            CLOSE_CARD: "../Taki/Images/other/close_card.png"
        }),

        enumResult: Object.freeze({CONTINUE_PLAYER_TURN: 0,SINGLE: 1, DOUBLE: 2, PLAYER_TURN_AGAIN: 3})
    }
})();

function getUniqueCss(color,type,separator){
    return color.concat(separator).concat(type);
}

function setCards(stock, cards) {
    for(var i = 0; i < cards.length; ++i){
        stock.push(cards[i]);
        cards[i].changeImage(true);
    }
}
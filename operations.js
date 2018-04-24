/**
 * @return {number}
 */
function changeColorOperation(player, playerCard) {

    return player.pickColor(playerCard);
/*
    var pickedColor = player.pickColor();
    playerCard.setColor(pickedColor);
    playerCard.setImage(getUniqueCss(Object.keys(enumCard.enumColor)[pickedColor],
        Object.keys(enumCard.enumTypes)[enumCard.enumTypes.CHANGE_COLOR],'_'));
    return enumCard.enumResult.NEXT_TURN;
*/
}

/**
 * @return {boolean}
 */
function changeColorValidation(lastCard) { //TODO:: CHECK IF WE CAN WITH ONE INPUT ELEMENT
   return !lastCard.isActive();
}

function numberOperation() {
    return enumCard.enumResult.NEXT_TURN;
}

function numberValidation(lastCard, playerCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.number === playerCard.number);
}

function plusOperation() {

    return enumCard.enumResult.EXTRA_TURN;
}

function plusValidation(lastCard, playerCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

function stopOperation() {
    return enumCard.enumResult.JUMP_TURN;
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
    player.setTakiMode(playerCard);

    return enumCard.enumResult.CONTINUE_TURN;
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
function takiOperation(player, playerCard) {
    player.setTakiMode(playerCard);
    return enumCard.enumResult.CONTINUE_TURN;
}

/**
 * @return {boolean}
 */
function takiValidation(lastCard, playerCard) {
    return !lastCard.isActive() && (lastCard.getColor() === playerCard.getColor() || lastCard.getSign() === playerCard.getSign());
}

function twoPlusOperation(player, playerCard) {
    playerCard.setActive(true);
    return enumCard.enumResult.NEXT_TURN;
}
/*work!*/


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
            STOCK: "stockCards", OPEN_CARDS: "openCards", STOCK_PARENT: "stock", STATISTICS: "statistics",
            CLOCK:"gameClock", PICK_COLOR: "pickColor", BLUE_PICK: "bluePicker", GREEN_PICK: "greenPicker",
            RED_PICK: "redPicker", YELLOW_PICK: "yellowPicker"
        }),

        cssStyle: Object.freeze({
            OPEN_CARD: "openCard", CLOSE_CARD: "closeCard"
        }),

        images: Object.freeze({
            CLOSE_CARD: "../Taki/Images/other/close_card.png"
        }),

        enumResult: Object.freeze({EXTRA_TURN: 0,NEXT_TURN: 1, JUMP_TURN: 2,
            CONTINUE_TURN: 3})
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
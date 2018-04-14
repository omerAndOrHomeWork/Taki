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

function numberValidation(card) {
    return !card.active && (card.color === this.color || card.sign === this.sign);

}

function plusOperation() {
    return 1;
}

function plusValidation(card) {
    return !card.active && (card.color === this.color || card.sign === this.sign);
}

function stopOperation() {
    return 2;
}

function stopValidation(card) {
    return !card.active && (card.color === this.color || card.sign === this.sign);
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
function takiValidation(card) {
    return !card.active && (card.color === this.color || card.sign === this.sign);
}

function twoPlusOperation() {
    return 1;
}

function twoPlusValidation(card) {
    return (card.color === this.color || card.sign === this.sign);
}

function pullApproval(cards, lastCard) {
    for(var i = 0; i < lastCard.length; ++i){
        if(lastCard[i].doValidation(lastCard))
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

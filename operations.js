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
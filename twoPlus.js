function TwoPlus(color) {

    var twoPlusOperation = function () {
        return 1;
    };

    function twoPlusValidation(card) {
        return (card.color === this.color || card.sign === this.sign);
    }

    Card.call(this, color, Card.TWO_PLUS, numberValidation, numberOperation, false);

    inherits(TwoPlus, Card);
}


function Plus(color) {

    var plusOperation = function () {
        return 1;
    };

    function plusValidation(card) {
        return !card.active && (card.color === this.color || card.sign === this.sign);
    }

    Card.call(this, color, Card.enumTypes.PLUS, numberValidation, numberOperation, false);

    inherits(Plus, Card);
}


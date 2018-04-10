function NumberCard(number, color) {
    this.number = number;

    var numberOperation = function () {
        return 1;
    };

    function numberValidation(card) {
        return !card.active && (card.color === this.color || card.sign === this.sign);

    }

 //   function color(card) {
// }

    Card.call(this, color, Card.enumTypes.NUMBER, numberValidation, numberOperation, false);


    inherits(NumberCard, Card);
}


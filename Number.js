function Number(color) {

    var numberOperation = function () {
        return 1;
    };

    function numberValidation(card) {
        return !card.active && (card.color === this.color || card.sign === this.sign);

    }

 //   function color(card) {
// }

    Card.call(this, color,"Number", numberValidation, numberOperation, false);

    inherits(Number, Card);
}


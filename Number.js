function Number(color) {

    var numberOperation = function () {};

    function numberValidation(card) {
        if(card.color == this.color || card.sign == this.sign)
            return true;
        else
            return false;

    }

 //   function color(card) {
// }

    Card.call(this, color,"Number", numberValidation, numberOperation);

    inherits(Number, Card);


}


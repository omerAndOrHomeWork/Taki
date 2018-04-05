function Number() {
    var color;
    var numberOperation = function () {

    };

    function numberValidation(card) {

    }

    function color(card) {

    }

    Card.call(this, color, numberValidation, numberOperation);

    inherits(Number, Card);

    function doValidation(card) {
        if(card.color == this.color || card.number == this.number)
            return true;
        else
            return false;
    }
}


function Stop(color) {
    //<script src="card.js" type="text/javascript"></script>
    function stopOperation() {
        return 2;
    }

    function stopValidation(card) {
        if(card.color == this.color || card.sign == this.sign)
            return true;
        else
            return false;

    }

    Card.call(this, color,"Stop", numberValidation, numberOperation);

}


inherits(Stop, Card);

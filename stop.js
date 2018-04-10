function Stop(color) {
    function stopOperation() {
        return 2;
    }

    function stopValidation(card) {
        return !card.active && (card.color === this.color || card.sign === this.sign);
    }

    Card.call(this, color, Card.enumTypes.STOP, stopValidation, stopOperation, false);

}


inherits(Stop, Card);

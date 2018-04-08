function ChangeColorCards() {

    /**
     * @return {number}
     */
    function changeColorOperation() {
        //hide = false
        //TODO: create 4 buttons and connect it to game(functionally)
        //comment;
        return 1;
    }

    /**
     * @return {boolean}
     */
    function changeColorValidation(card) {
        return card.sign !== "+2";
    }

    Card.call(this, null, "changeColor", ChangeColorValidation, ChangeColorOperation, false);
}


inherits(Stop, Card);
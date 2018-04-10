function ChangeColorCard() {

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

    Card.call(this, null, Card.enumTypes.CHANGE_COLOR, ChangeColorValidation, ChangeColorOperation, false);
}


inherits(Stop, Card);
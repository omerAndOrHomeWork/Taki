function SuperTaki() {
    /**
     * @return {number}
     */
    function superTakiOperation() {
        return -1;
    }

    /**
     * @return {boolean}
     */
    function superTakiValidation(card) {
        return !card.active;
    }

    Card.call(this, color, Card.enumTypes.SUPER_TAKI, superTakiValidation, superTakiOperation, false);
}
inherits(Taki, Card);

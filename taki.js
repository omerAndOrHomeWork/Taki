function Taki(color) {
    /**
     * @return {number}
     */
    function takiOperation() {
        return -1;
    }

    /**
     * @return {boolean}
     */
    function takiValidation(card) {
        return !card.active && (card.color === this.color || card.sign === this.sign);
    }

    Card.call(this, color, Card.enumTypes.TAKI, takiValidation, takiOperation, false);
}
inherits(Taki, Card);

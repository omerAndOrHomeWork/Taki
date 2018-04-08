function Stock() {
    var cards;
    function randomSort() {

    }

    return{
        //set 8 cards for player
        getCards: function() {
            return cards;
        },

        reShufel: function(openCards) {
            cards = openCards;
            card[card.length - 1] = null;
            randomSort();
            return getCard();
        }
    };
}
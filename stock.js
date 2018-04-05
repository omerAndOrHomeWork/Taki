function Stock() {
    var cards;
    function randomSort() {

    }

    return{
        //set 8 cards for player
        getCards: function() {
            return cards;
        },

        getCard: function() {

        },

        reShufel: function(openCards) {
            cards = openCards;
            randomSort();
            return getCard();
        }
    };
}
function Player() {
    var cards;
    var AVG;
    var singleCardCounter = 0;

    function dragValidation(card) {
        if(cards.contains(card))
            return true;
        return false;
    }

    /*function setCards(playerHtml) {

        //playerHtml.add(<li>card</li>)
        ///players.Add(<li>player</li>);
    }*/

    return{
        calculateAVG: function(){

        },

        startClock: function () {

        },

        setCards: function (cards) {
            this.cards = cards;
        }

    };
}


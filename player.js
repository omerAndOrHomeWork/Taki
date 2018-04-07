function Player() {
    var cards;
    var AVG;
    var singleCardCounter = 0;
    var takiMode = false;

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
        },

        doOperation: function (card) {
            this.getCards.pop(card);
            var promote = card.doOperation();
            if(promote === -1)
                player.takiMode = card;
            if(player.takiMode !== null)
                promote = checkMoreFromTakiColor();
            return promote;
        }

    };
}


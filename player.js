function Player() {
    var cards = [];
    var AVG;
    var singleCardCounter = 0;
    var takiMode;

    function dragValidation(card) {
        if(cards.contains(card))
            return true;
        return false;
    }

    /*function setCards(playerHtml) {

        //playerHtml.add(<li>card</li>)
        ///players.Add(<li>player</li>);
    }*/

    function checkMoreFromTakiColor () {
        var promote;
        var foundColor = false;
        for(var i = 0; i < cards.length; ++i){
            if(cards[i].color === takiMode.color){
                promote = 0;
                foundColor = true;
                break;
            }
        }
        if(!foundColor) {
            takiMode = null;
            promote = 1;
        }
        return promote;
    }

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
            if(cards.length === 1)
                singleCardCounter++;
            return promote;
        }

    };
}


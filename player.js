var player = function () {
    var cards = [];
    var averageTimePlayed = 0;
    var turnsPlayed = 0;
    var singleCardCounter = 0;
    var takiMode = null;
    var currentTurnTime;
    var cardsCss = enumCard.cssStyle.OPEN_CARDS;

    /*function setCards(playerHtml) {

        //playerHtml.add(<li>card</li>)
        ///players.Add(<li>player</li>);
    }*/

    /*function checkMoreFromTakiColor() {
        var promote;
        var foundColor = false;
        for (var i = 0; i < cards.length; ++i) {
            if (cards[i].color === takiMode.color) {
                promote = 0;
                foundColor = true;
                break;
            }
        }
        if (!foundColor) {
            takiMode = null;
            promote = 1;
        }
        return promote;
    }


    function removeCard(card) {
        for (var i = 0; i < cards.length; ++i) {
            if (cards[i] === card) {
                cards.splice(i, 1);
            }
        }
    }*/

    return {
        calculateAVG: function (currentTurnTime) {
            averageTimePlayed *= turnsPlayed;
            averageTimePlayed += currentTurnTime;
            turnsPlayed++;
            averageTimePlayed /= turnsPlayed;
        },

        startClock: function () {
            currentTurnTime = 0;
        },

        calcCurrentTurn: function () {
            currentTurnTime += 1;
        },

        setCards: function (theCards) {
            cards = theCards;
            for(var i = 0; i < cards.length; ++i){
                cards[i].setParent(enumCard.dives.PLAYER_CARDS);
            }
        },

        getSingleCardCounter: function(){
            return singleCardCounter;
        },

        getTurnsPlayed: function(){
          return turnsPlayed;
        },

        doOperation: function (card) {
            removeCard(cards, card);
            var promote = card.doOperation();
            if (promote === -1)
                takiMode = card;
            if (takiMode !== null)
                promote = takiModeChecker(cards);
            if (cards.length === 1)
                singleCardCounter++;
            return promote;
        },

        pullCardFromStock: function (card) {
            player.getCards.push(card);
        },

        //optional that player can drag his cards only in his turn
        // will get also "players","turn"
        //and will check in addition this === players[turn]
        dragValidation: function(card) {
            return cards.contains(card);
        },

        pullApproval: function (lastCard){
            pullApproval(cards, lastCard);
        },

        getCard: function (id) {
            searchCard(cards, id);
        },

        getCss: function () {
            return cardsCss;
        },

        singleCard: singleCardCounter
    };
};

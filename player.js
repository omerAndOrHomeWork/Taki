var player = function (pullApproval, takiChecker, removeCard) {
    var cards = [];
    var averageTimePlayed;
    var turnsPlayed = 0;
    var singleCardCounter = 0;
    var takiMode;
    var currentTurnTime;
    var pullApprovalFunc = pullApproval;
    var takiCheckerFunc = takiChecker;
    var removeCardFunc = removeCard;


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
            avrageTimePlayed *= turnsPlayed;
            avrageTimePlayed += currentTurnTime;
            turnsPlayed++;
            avrageTimePlayed /= turnsPlayed;
        },

        startClock: function () {
            currentTurnTime = 0;
        },

        clacCureentTruen: function () {
            currentTurnTime += 1;
        },

        setCards: function (cards) {
            this.cards = cards;
        },

        doOperation: function (card) {
            removeCardFunc(cards, card);
            var promote = card.doOperation();
            if (promote === -1)
                takiMode = card;
            if (takiMode !== null)
                promote = takiCheckerFunc();
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
            pullApprovalFunc(cards, lastCard);
        }
    };
}

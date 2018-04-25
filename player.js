var player = function () {
    var cards = [];
    var averageTimePlayed = 0;
    var turnsPlayed = 0;
    var singleCardCounter = 0;
    var takiMode = undefined;
    var currentTurnTime = 0;
    var htmlPlayerDiv = enumCard.dives.PLAYER_CARDS;



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
            takiMode = undefined;
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
        calcCurrentTurn: function () {
                currentTurnTime += 1;
         },

        calculateAVG: function () {
            averageTimePlayed *= (turnsPlayed - 1);
            averageTimePlayed += currentTurnTime;
            averageTimePlayed /= turnsPlayed;
        },
/*
        setCssIDPlayer: function(cssID){
            htmlPlayer.id += Object.keys(enumCard.enumPlayer)[cssID];
        },
*/
        resetPlayerClock: function () {
            currentTurnTime = 0;
        },

        getAverageTimePlayed: function(){
            return averageTimePlayed;
        },

        setCards: function (theCards) {
            cards = theCards;
            setInterval(this.calcCurrentTurn.bind(this),1000);
            for(var i = 0; i < cards.length; ++i){
                cards[i].setParent(enumCard.dives.PLAYER_CARDS, true);
                cards[i].changeImage(true);
            }
        },

        getSingleCardCounter: function(){
            return singleCardCounter;
        },

        getTurnsPlayed: function(){
          return turnsPlayed;
        },
      
        increasePlayerTurns: function () {
            turnsPlayed += 1;
        },
      
        doOperation: function (card, lastCard) {
            removeCard(cards, card);
            var promote = card.doOperation(this, lastCard);
            if (takiMode !== undefined) {
                if(takiModeChecker(cards, takiMode)) {
                    promote = enumCard.enumResult.CONTINUE_TURN;
                    card.setActive(false);
                }
                else{
                    takiMode = undefined;
                    if(promote === enumCard.enumResult.CONTINUE_TURN)
                        promote = enumCard.enumResult.NEXT_TURN;
                }
            }
            if (cards.length === 1)
                singleCardCounter++;
            return promote;
        },

        pullCardFromStock: function (cardsToSet) {
            setCards(cards, cardsToSet);
        },

        //optional that player can drag his cards only in his turn
        // will get also "players","turn"
        //and will check in addition this === players[turn]
        dragValidation: function(card) {
            return cards.contains(card);
        },

        pullApproval: function (lastCard){
            return pullApproval(cards, lastCard);
        },

        getCard: function (id) {
            return searchCard(cards, id);
        },

        getHtmlDiv: function () {
            return htmlPlayerDiv;
        },

        isDraggable: function(){
            return true;
        },

        getAmountOfCards: function(){
            return cards.length;
        },

        isComputer: function () {
            return false;
        },
      
        pickColor: function (playerCard) {
            var picker;
            var pickColorId = document.getElementById(enumCard.dives.PICK_COLOR);
            pickColorId.style.visibility = "visible";


            return enumCard.enumResult.CONTINUE_TURN;
        },

        setTakiMode: function (card) {
            takiMode = card;
        },

        getAllCards: function(){
            return cards;
        },

        getTakiMode: function () {
            return takiMode;
        }
    };
};
//stam
var player = function () {
    var cards = [];
    var averageTimePlayed = 0;
    var turnsPlayed = 0;
    var turnsPlayedForStatistics = 0;
    var singleCardCounter = 0;
    var takiMode = undefined;
    var currentTurnTime = 0;
    var htmlPlayerDiv = enumCard.dives.PLAYER_CARDS;

    return {
        calcCurrentTurn: function () {
                currentTurnTime += 1;
         },

        calculateAVG: function () {
            averageTimePlayed *= (turnsPlayed - 1);
            averageTimePlayed += currentTurnTime;
            averageTimePlayed /= turnsPlayed;
        },

        resetPlayerClock: function () {
            currentTurnTime = 0;
        },

        getAverageTimePlayed: function(){
            return averageTimePlayed;
        },

        setAverageTimePlayed: function(currentAvarageTimePlayed){
          averageTimePlayed = currentAvarageTimePlayed;
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
          return turnsPlayedForStatistics;
        },

        setTurnsPlayed: function(currentTurnsPlayed){
           turnsPlayed =  currentTurnsPlayed;
        },
      
        increasePlayerTurns: function () {
            turnsPlayedForStatistics+=1;
            turnsPlayed += 1;
        },
      
        doOperation: function (card, lastCard) {
            removeCard(cards, card);
            changeMerging(document.getElementById(enumCard.dives.PLAYER_CARDS), cards.length);
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
            changeMerging(document.getElementById(enumCard.dives.PLAYER_CARDS), cards.length);
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
      
        pickColor: function () {
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
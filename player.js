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

    function colorPicked(event, pickedColor, playerCard) {
        event.preventDefault();
        playerCard.setColor(pickedColor);
        playerCard.setImage(getUniqueCss(Object.keys(enumCard.enumColor)[pickedColor],
            Object.keys(enumCard.enumTypes)[enumCard.enumTypes.CHANGE_COLOR],'_'));
        document.getElementById("pickColor").visibility = "hidden";
    }

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
                if(takiModeChecker(cards, takiMode))
                    promote = enumCard.enumResult.PLAYER_TURN_AGAIN;
                else{
                    takiMode = undefined;
                    if(promote === enumCard.enumResult.PLAYER_TURN_AGAIN)
                        promote = enumCard.enumResult.SINGLE;
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

        singleCard: singleCardCounter,

        isComputer: function () {
            return false;
        },
      
        pickColor: function (playerCard) {
            var picker;
            var pickColorId = document.getElementById(enumCard.dives.PICK_COLOR);
            pickColorId.visibility = "visible";
            var blue = pickColorId.getElementById(enumCard.dives.BLUE_PICK);
            blue.addEventListener("onclick", function (ev) {
                colorPicked(ev, enumCard.enumColor.BLUE, playerCard);
            }, false);

            var green = pickColorId.getElementById(enumCard.dives.GREEN_PICK);
            green.addEventListener("onclick", function (ev) {
                colorPicked(ev, enumCard.enumColor.GREEN, playerCard);
            }, false);

            var red = pickColorId.getElementById(enumCard.dives.RED_PICK);
            red.addEventListener("onclick", function (ev) {
                colorPicked(ev, enumCard.enumColor.RED, playerCard);
            }, false);

            var yellow = pickColorId.getElementById(enumCard.dives.YELLOW_PICK);
            yellow.addEventListener("onclick", function (ev) {
                colorPicked(ev, enumCard.enumColor.YELLOW, playerCard);
            }, false);

            return enumCard.enumResult.CONTINUE_PLAYER_TURN;
        },

        setTakiMode: function (card) {
            takiMode = card;
        }
    };
};

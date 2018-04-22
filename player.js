var player = function () {
    var cards = [];
    var averageTimePlayed = 0;
    var turnsPlayed = 0;
    var singleCardCounter = 0;
    var takiMode = undefined;
    var currentTurnTime = 0;
    var htmlPlayerDiv = enumCard.dives.PLAYER_CARDS;


    function calcCurrentTurn() {
        currentTurnTime += 1;
    }
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
        calculateAVG: function () {
            averageTimePlayed *= turnsPlayed;
            averageTimePlayed += currentTurnTime;
            averageTimePlayed /= turnsPlayed;
        },
/*
        setCssIDPlayer: function(cssID){
            htmlPlayer.id += Object.keys(enumCard.enumPlayer)[cssID];
        },
*/
        startClock: function () {
            currentTurnTime = 0;
        },

        getAverageTimePlayed: function(){
            return averageTimePlayed;
        },

        setCards: function (theCards) {
            cards = theCards;
            setInterval(calcCurrentTurn(),1000);
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
                    promote = 0;
                else{
                    takiMode = undefined;
                    if(promote === -1)
                        promote = 1;
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

        selectAndPickColorOperation: function(){
            var pickedColor = player.pickColor();
            playerCard.setColor(pickedColor);
            playerCard.setImage(getUniqueCss(Object.keys(enumCard.enumColor)[pickedColor],
                Object.keys(enumCard.enumTypes)[enumCard.enumTypes.CHANGE_COLOR],'_'));
      //      return enumCard.enumResult.PLAYER_TURN_AGAIN;
        },
      
        pickColor: function () {
            var picker;
            var pickColorId = document.getElementById("pickColor");
            pickColorId.visibility = "visible";
            var blue = pickColorId.getElementById("bluePicker");
            blue.onclick = function (ev) {
                ev.preventDefault();
                picker = enumCard.enumColor.BLUE;
                pickColorId.visibility = "hidden";
            };
            var green = pickColorId.getElementById("greenPicker");
            green.onclick = function (ev) {
                ev.preventDefault();
                picker = enumCard.enumColor.GREEN;
                pickColorId.visibility = "hidden";
            };
            var red = pickColorId.getElementById("redPicker");
            red.onclick = function (ev) {
                ev.preventDefault();
                picker = enumCard.enumColor.RED;
                pickColorId.visibility = "hidden";
            };
            var yellow = pickColorId.getElementById("yellowPicker");
            yellow.onclick = function (ev) {
                ev.preventDefault();
                picker = enumCard.enumColor.YELLOW;
                pickColorId.visibility = "hidden";
            };
            //TODO: HTML_OPERATION
        },

        setTakiMode: function (card) {
            takiMode = card;
        }
    };
};

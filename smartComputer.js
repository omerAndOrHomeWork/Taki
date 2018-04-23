var smartComputer = function() {
    var colorsCards = [[], [], [], []];//sorting in enumColor sort
    var typesCards = [[], [], [], [], [], [], []];//sorting in enumType sort
    var playerCards = [];
    var takiMode = undefined;
    var numberOfPlayers;
    var lastCardInTaki = undefined;
    var singleCardCounter = 0;
    var turnsPlayed = 0;
    var htmlPlayerDiv = enumCard.dives.COMPUTER_CARDS;

    function insertColor(playerCard) {
        colorsCards[playerCard.getColor()].push(playerCard);
    }

    function insertType(playerCard) {
        typesCards[playerCard.getSign()].push(playerCard);
    }

    function setAllCards(cards) {
        for(var i = 0; i < cards.length; ++i){
            if(cards[i].getColor() !== undefined)
                insertColor(cards[i]);
            insertType(cards[i]);
            playerCards.push(cards[i]);
        }
    }

    function colorsLeftAmount() {
        var colors = 0;
        for(var i = 0; i < colorsCards.length; ++i){
            if(colorsCards[i].length > 0)
                colors++;
        }
        return colors;
    }

    function equal(parameterOne, parameterTwo) {
        return parameterOne === parameterTwo;
    }

    function different(parameterOne, parameterTwo) {
        return parameterOne !== parameterTwo;
    }

    //find the given type in the most least getColor() in hand
    function typeCardWithLeastSameColorInHand(type) {
        var pickedCard = undefined;
        for(var i = 0; i < typesCards[type].length; ++i) {
            var currentCard = typesCards[type][i];
            if(pickedCard === undefined)
                pickedCard = currentCard;
            else if(colorsCards[pickedCard.getColor()].length > colorsCards[currentCard.getColor()].length)
                pickedCard = currentCard;
        }
        return pickedCard;
    }


    /*checked! works good!*/
    function typeAndColorMatch(type, color, matchFunc) {
        for(var i = 0; i < typesCards[type].length; ++i){
            if(matchFunc(typesCards[type][i].getColor(), color))
                return typesCards[type][i];
        }
        return undefined;
    }

    function typeOrColorMatch(type, lastGameCard, matchFunc) {
        var pickedCard = typeAndColorMatch(type, lastGameCard.getColor(), matchFunc);
        if( pickedCard === undefined && type === lastGameCard.getSign()){
            return typeCardWithLeastSameColorInHand(type);
        }
        return undefined;
    }



    /*
        //find the first card in given type that have same getColor() in given
        function typeInColor(type, getColor()) {
            for(var i = 0; i < typesCards[type].length; ++i){
                if(typesCards[type][i].getColor() === getColor())
                    return typesCards[type][i];
            }
            return undefined;
        }

        //find the first card in given type that have different getColor() from given
        function typesInDifferentColor(type, getColor()) {
            for(var i = 0; i < typesCards[type].length; ++i){
                if(typesCards[type][i].getColor() !== getColor())
                    return typesCards[type][i];
            }
            return undefined;
        }
    */

    function connectionNumber(color, matchFunc) {
        var pickedCard;
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].getSign() === enumCard.enumTypes.NUMBER) {
                pickedCard = cardNumberInDifferentColor(colorsCards[color][i]);
                if (matchFunc(pickedCard, undefined)) {
                        return colorsCards[color][i];
                }
            }
        }
        return undefined;
    }

/*
    //find the first card number(different getColor()), that have matching number in the given getColor()
    function findFirstConnectionNumber(getColor()) {
        var card = undefined;
        for(var i = 0; i < colorsCards[getColor()].length; ++i){
            if(colorsCards[getColor()][i].getSign() === enumCard.enumTypes.NUMBER)
                card = cardNumberInDifferentColor(colorsCards[getColor()][i]);
            if(card !== undefined)
                return card;
        }
        return card;
    }

    //find the first card number that have no matching number in the other colors
    function findFirstNoConnectionNumber(getColor()) {
        var card = undefined;
        for(var i = 0; i < colorsCards[getColor()].length; ++i){
            if(colorsCards[getColor()][i].getSign() === enumCard.enumTypes.NUMBER)
                card = cardNumberInDifferentColor(colorsCards[getColor()][i]);
            if(card === undefined)
                return colorsCards[getColor()][i];
        }
        return card;
    }
*/

    //find if there is same number, in different getColor()
    function cardNumberInDifferentColor(lastGameCard) {
        //var cards = [];
        for(var i = 0; i < typesCards[enumCard.enumTypes.NUMBER].length; ++i){
            var numberCard = typesCards[enumCard.enumTypes.NUMBER][i];
            if(numberCard.getColor() !== lastGameCard.getColor() && numberCard.number === lastGameCard.number)
                return numberCard;
        }

        return undefined;
    }

    //search for the first same getColor(), in different type
    function findColorCardNotInGivenType(color, type) {
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].getSign() !== type)
                return colorsCards[color][i];
        }
        return undefined;
    }

   /*function removeCard(array, card) {
        for(var i = 0; i < array.length; ++i) {
            if(array[i] === card) {
                array.splice(i, 1);
                return;
            }
        }
    }*/

    function regularOperationWithTwoPlayers(lastGameCard) {
        var pickedCard;
        if(typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), different) === undefined){
            pickedCard = typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), equal);
            if(pickedCard !== undefined)
                return pickedCard;
        }//checked!! works good

        pickedCard = connectionNumber(lastGameCard.getColor(), equal);//firstUnconnectedNumber
        if(pickedCard !== undefined)
            return pickedCard;//checked!! work good!
        pickedCard = connectionNumber(lastGameCard.getColor(), different);//firstConnectedNumber
        if(pickedCard !== undefined)
            return pickedCard;//checked!! work good!
        if (lastGameCard.getSign() === enumCard.enumTypes.NUMBER) {
            pickedCard = cardNumberInDifferentColor(lastGameCard);
            if (pickedCard !== undefined)
                return pickedCard;//checked!! work good!
        }
        pickedCard = typeOrColorMatch(enumCard.enumTypes.TWO_PLUS, lastGameCard, equal);
        if(pickedCard !== undefined)
            return pickedCard;
        pickedCard = typeOrColorMatch(enumCard.enumTypes.STOP, lastGameCard, equal);
        if(pickedCard !== undefined)
            return pickedCard;
        return typeOrColorMatch(enumCard.enumTypes.PLUS, lastGameCard, equal);
    }

    function regularOperationWithMorePlayers(lastGameCard) {
        var pickedCard;
        pickedCard = connectionNumber(lastGameCard.getColor(), equal);
        if (pickedCard !== undefined)
            return pickedCard;//checked!! work good!
        pickedCard = connectionNumber(lastGameCard.getColor(), different());
        if (pickedCard !== undefined)
            return pickedCard;//checked!! work good!
        if (lastGameCard.getSign() === enumCard.enumTypes.NUMBER) {
        pickedCard = cardNumberInDifferentColor(lastGameCard);
        if (pickedCard !== undefined)
            return pickedCard;//checked!! work good!
        }
        pickedCard = typeOrColorMatch(enumCard.enumTypes.PLUS, lastGameCard, equal);
        if(pickedCard !== undefined)
            return pickedCard;
        pickedCard = typeOrColorMatch(enumCard.enumTypes.STOP, lastGameCard, equal);
        if(pickedCard !== undefined)
            return pickedCard;
        return typeOrColorMatch(enumCard.enumTypes.TWO_PLUS, lastGameCard, equal);
    }

    function colorCardInTaki(lastGameCard) {
        var currentCard;
        for(var i = 0; i < colorsCards[lastGameCard.getColor()].length; ++i){
            currentCard = colorsCards[lastGameCard.getColor()][i];
            if(currentCard.getId() !== lastCardInTaki.getId() && currentCard.doValidation(lastGameCard)) {
                return currentCard;
            }
        }

        if(lastCardInTaki.doValidation(lastGameCard)){
            // takiMode = false;
            currentCard = lastCardInTaki;
            lastCardInTaki = undefined;
            return currentCard;
        }

        return undefined;
    }

    function takiOperationWithTwoPlayers(lastGameCard) {
        if(typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), different) !== undefined){
            lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), equal);
            if(lastCardInTaki !== undefined)
                return;
        }
        if(typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), different) !== undefined){
            lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), equal);
            if(lastCardInTaki !== undefined)
                return;
        }
        lastCardInTaki = connectionNumber(lastGameCard.getColor(), different);
        if(lastCardInTaki !== undefined)
            return;
        if(typesCards[enumCard.enumTypes.CHANGE_COLOR].length > 0){
            lastCardInTaki = typesCards[enumCard.enumTypes.CHANGE_COLOR][0];
            return;
        }
        lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.TWO_PLUS, lastGameCard.getColor(), equal);
        if(lastCardInTaki !== undefined)
            return;//checked!! work good!
        lastCardInTaki = findColorCardNotInGivenType(lastGameCard.getColor(), enumCard.enumTypes.PLUS);
        if(lastCardInTaki !== undefined)
            return;
        if(colorsCards[lastGameCard.getColor()].length > 0)
            lastCardInTaki = colorsCards[lastGameCard.getColor()][0];
        else
            lastCardInTaki = undefined;
    }

    function takiOperationWithMorePlayers(lastGameCard) {
        if(typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), different) !== undefined){
            lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), equal);
            if(lastCardInTaki !== undefined)
                return;
        }
        lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), equal);
        if(lastCardInTaki !== undefined)
            return;
        lastCardInTaki = connectionNumber(lastGameCard.getColor(), different);
        if(lastCardInTaki !== undefined)
            return;
        if(typesCards[enumCard.enumTypes.CHANGE_COLOR].length > 0){
            lastCardInTaki = typesCards[enumCard.enumTypes.CHANGE_COLOR][0];
            return;
        }
        lastCardInTaki = findColorCardNotInGivenType(lastGameCard.getColor(), enumCard.enumTypes.PLUS);
        if(lastCardInTaki !== undefined)
            return;
        if(colorsCards[lastGameCard.getColor()].length > 0)
            lastCardInTaki = colorsCards[lastGameCard.getColor()][0];
        else
            lastCardInTaki = undefined;
    }

    function removeAllCardAppearances(card) {
        if(card.getColor() !== undefined)
            removeCard(colorsCards[card.getColor()], card);
        removeCard(typesCards[card.getSign()], card);
        removeCard(playerCards, card);
    }

    function firstAvailableCard(lastGameCard) {
        for(var i = 0; i < playerCards.length; ++i){
            if(playerCards[i].doValidation(lastGameCard))
                return playerCards[i];
        }
        return undefined;
    }

    function regularOperation(lastGameCard) {
        var pickedCard = undefined;
        if(typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), different) === undefined){
            pickedCard = typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), equal);
            if(pickedCard !== undefined)
                return pickedCard;
        }//checked!! work good
        if (numberOfPlayers === 2)
            pickedCard = regularOperationWithTwoPlayers(lastGameCard);
        else if (numberOfPlayers > 2)
            pickedCard = regularOperationWithMorePlayers(lastGameCard);
        return pickedCard;
    }

    function signOperation(lastGameCard) {
        var differentColorType;
        if (lastGameCard.getSign() !== enumCard.enumTypes.PLUS && lastGameCard.getSign() !== enumCard.enumTypes.STOP)
            return undefined;
        differentColorType = typeCardWithLeastSameColorInHand(lastGameCard.getSign());
        if (colorsCards[lastGameCard.getColor()].length > 0) {
            if (differentColorType === undefined ||
                colorsCards[lastGameCard.getColor()].length <= colorsCards[differentColorType.getColor()].length)
                return regularOperation(lastGameCard);
        }
        return differentColorType;
    }

    function superTakiExecute(lastGameCard) {
        var pickedCard = undefined;
        if(colorsLeftAmount() === 1 && colorsCards[lastGameCard.getColor()].length > 0 &&
            typesCards[enumCard.enumTypes.SUPER_TAKI].length > 0){
            // takiMode = true;
            pickedCard = typesCards[enumCard.enumTypes.SUPER_TAKI][0];
        }
        return pickedCard;
    }

    function takiOperation(lastGameCard) {
        var pickedCard;
        if(takiMode !== undefined){
            if(lastCardInTaki === undefined) {
                if (numberOfPlayers === 2)
                    takiOperationWithTwoPlayers(lastGameCard);
                else if (numberOfPlayers > 2)
                    takiOperationWithMorePlayers(lastGameCard);
            }
            pickedCard = colorCardInTaki(lastGameCard);
        }else{
            pickedCard = typeAndColorMatch(enumCard.enumTypes.TAKI, lastGameCard.getColor(), equal);
            /*if(pickedCard !== undefined && pickedCard.doOperation()){
                takiMode = true;
            }*/
        }
        return pickedCard;
    }

    function plusTwoOperation(lastGameCard) {
        if(lastGameCard.getSign() === enumCard.enumTypes.TWO_PLUS && lastGameCard.isActive())
            return typeCardWithLeastSameColorInHand(enumCard.enumTypes.TWO_PLUS);
        else
            return undefined;
    }

    function operation(lastGameCard){
        var pickedCard;
        pickedCard = plusTwoOperation(lastGameCard);
        if(pickedCard === undefined)
            pickedCard = takiOperation(lastGameCard);
        if(pickedCard === undefined)
            pickedCard = superTakiExecute(lastGameCard);
        if(pickedCard === undefined)
            pickedCard = signOperation(lastGameCard);
        if(pickedCard === undefined)
            pickedCard = regularOperation(lastGameCard);
        if(pickedCard === undefined){
            if (typesCards[enumCard.enumTypes.CHANGE_COLOR].length > 0)
                pickedCard = typesCards[enumCard.enumTypes.CHANGE_COLOR][0];
        }
        if(pickedCard === undefined)
            pickedCard = firstAvailableCard(lastGameCard);
        return pickedCard;
    }


    function addCard(cardsToAdd) {
        for(var i = 0; i < cardsToAdd.length; ++i){
            if(cardsToAdd[i].getColor() !== undefined)
                insertColor(cardsToAdd[i]);
            insertType(cardsToAdd[i]);
            playerCards.push(cardsToAdd[i]);
            cardsToAdd[i].setParent(enumCard.dives.COMPUTER_CARDS, false);
            cardsToAdd[i].changeImage(false);
        }
    }

    return{
        setCards: function(cards, playersAmount){
            numberOfPlayers = playersAmount;
            setAllCards(cards);
            for(var i = 0; i < cards.length; ++i){
                cards[i].setParent(enumCard.dives.COMPUTER_CARDS, false);
                cards[i].changeImage(true);
            }
        },

        pullCardFromStock: function(cardsToAdd){
            addCard(cardsToAdd);
        },

        pickCard: function(lastGameCard){
            return operation(lastGameCard);
        },

        reducePlayer: function(){
            numberOfPlayers = numberOfPlayers - 1;
        },

        increasePlayerTurns: function () {
            turnsPlayed += 1;
        },

        resetPlayerClock: function(){
            return 0;
        },

        calculateAVG: function () {
            return 0;
        },

        getAverageTimePlayed: function(){
            return 0;
        },
        doOperation: function(card, lastCard) {
            var promote = card.doOperation(this, lastCard);
            removeAllCardAppearances(card);
            if (takiMode !== undefined) {
                if(takiModeChecker(playerCards, takiMode))
                    promote = enumCard.enumResult.PLAYER_TURN_AGAIN;
                else{
                    takiMode = undefined;
                    if(promote === enumCard.enumResult.PLAYER_TURN_AGAIN)
                        promote = enumCard.enumResult.SINGLE;
                }
            }
            if (playerCards.length === 1)
                singleCardCounter++;
            return promote;
        },

        pullApproval: function (lastCard){
            return pullApproval(playerCards, lastCard);
        },

        getCard: function (id) {
            searchCard(playerCards, id);
        },

        getHtmlDiv: function () {
            return htmlPlayerDiv;
        },
        isComputer: function () {
            return true;
        },
        getSingleCardCounter: function() {
            return singleCardCounter;
        },

        isDraggable: function () {
            return false;
        },

        getTurnsPlayed: function(){
            return turnsPlayed;
        },
      
        pickColor: function () {
            for(var i = 0; i < playerCards.length; ++i){
                if(playerCards[i].getColor() !== undefined)
                    return playerCards[i];
            }
            //TODO: LOGIC
        },

        setTakiMode: function (card) {
            takiMode = card;
        }
    }
};
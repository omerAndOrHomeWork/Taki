var smartComputer = function() {
    var colorsCards = [[], [], [], []];//sorting in enumColor sort
    var typesCards = [[], [], [], [], [], [], []];//sorting in enumType sort
    var playerCards = [];
    var takiMode = false;
    var numberOfPlayers;
    var lastCardInTaki = null;
    var singleCardCounter = 0;
    var cardsCss = enumCard.cssStyle.CLOSE_CARD;

    function insertColor(playerCard) {
        colorsCards[playerCard.getColor()].push(playerCard);
    }

    function insertType(playerCard) {
        typesCards[playerCard.getSign()].push(playerCard);
    }

    function setAllCards(cards) {
        for(var i = 0; i < cards.length; ++i){
            if(cards[i].getColor() !== null)
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

    function typeAndColorMatch(type, color, matchFunc) {
        for(var i = 0; i < typesCards[type].length; ++i){
            if(matchFunc(typesCards[type][i].getColor(), color))
                return typesCards[type][i];
        }
        return null;
    }

    function typeOrColorMatch(type, card, matchFunc) {
        for(var i = 0; i < typesCards[type].length; ++i){
            if(matchFunc(typesCards[type][i].getColor(), card.getColor()))
                return typesCards[type][i];
        }
        if(type === card.getSign()){
            for(i = 0; i < typesCards[type].length; ++i){
                if(matchFunc(typesCards[type][i].getSign(), card.getSign()))
                    return typesCards[color][i];
            }
        }
        return null;
    }



    /*
        //find the first card in given type that have same getColor() in given
        function typeInColor(type, getColor()) {
            for(var i = 0; i < typesCards[type].length; ++i){
                if(typesCards[type][i].getColor() === getColor())
                    return typesCards[type][i];
            }
            return null;
        }

        //find the first card in given type that have different getColor() from given
        function typesInDifferentColor(type, getColor()) {
            for(var i = 0; i < typesCards[type].length; ++i){
                if(typesCards[type][i].getColor() !== getColor())
                    return typesCards[type][i];
            }
            return null;
        }
    */

    function connectionNumber(color, matchFunc) {
        var pickedCard = null;
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].getSign() === enumCard.enumTypes.NUMBER)
                pickedCard = cardNumberInDifferentColor(colorsCards[color][i]);
            if(matchFunc(pickedCard,null)) {
                if(pickedCard !== null)
                    return pickedCard;
                else
                    return colorsCards[color][i];
            }
        }
        return pickedCard;
    }

/*
    //find the first card number(different getColor()), that have matching number in the given getColor()
    function findFirstConnectionNumber(getColor()) {
        var card = null;
        for(var i = 0; i < colorsCards[getColor()].length; ++i){
            if(colorsCards[getColor()][i].getSign() === enumCard.enumTypes.NUMBER)
                card = cardNumberInDifferentColor(colorsCards[getColor()][i]);
            if(card !== null)
                return card;
        }
        return card;
    }

    //find the first card number that have no matching number in the other colors
    function findFirstNoConnectionNumber(getColor()) {
        var card = null;
        for(var i = 0; i < colorsCards[getColor()].length; ++i){
            if(colorsCards[getColor()][i].getSign() === enumCard.enumTypes.NUMBER)
                card = cardNumberInDifferentColor(colorsCards[getColor()][i]);
            if(card === null)
                return colorsCards[getColor()][i];
        }
        return card;
    }
*/

    //find if there is same number, in different getColor()
    function cardNumberInDifferentColor(card) {
        //var cards = [];
        for(var i = 0; i < typesCards[enumCard.enumTypes.NUMBER].length; ++i){
            var numberCard = typesCards[enumCard.enumTypes.NUMBER][i];
            if(numberCard.getColor() !== card.getColor() && numberCard.number === card.number)
                return true;
                //cards.push(numberCard);
        }
        //return cards;
        return false;
    }

    //find the given type in the most least getColor() in hand
    function typeCardWithLeastSameColorInHand(type) {
        var pickedCard = null;
        for(var i = 0; i < typesCards[type].length; ++i) {
            var currentCard = typesCards[type][i];
            if(pickedCard === null)
                pickedCard = currentCard;
            else if(colorsCards[pickedCard.getColor()].length > colorsCards[currentCard.getColor()].length)
                pickedCard = currentCard;
        }
        return pickedCard;
    }

    //search for the first same getColor(), in different type
    function findColorCardNotInGivenType(color, type) {
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].getSign() !== type)
                return colorsCards[color][i];
        }
        return null;
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
        if(typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), different) === null){
            pickedCard = typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), equal);
            if(pickedCard != null)
                return pickedCard;
        }
        pickedCard = connectionNumber(lastGameCard.getColor(), different);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = connectionNumber(lastGameCard.getColor(), equal);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = typeOrColorMatch(enumCard.enumTypes.TWO_PLUS, lastGameCard.getColor(), equal);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = typeOrColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), equal);
        if(pickedCard !== null)
            return pickedCard;
        return typeOrColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), equal);
    }

    function regularOperationWithMorePlayers(lastGameCard) {
        var pickedCard;
        pickedCard = connectionNumber(lastGameCard.getColor(), different);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = connectionNumber(lastGameCard.getColor(), equal);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), equal);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), equal);
        if(pickedCard !== null)
            return pickedCard;
        return typeAndColorMatch(enumCard.enumTypes.TWO_PLUS, lastGameCard.getColor(), equal);
    }

    function colorCardInTaki(lastGameCard) {
        var currentCard;
        for(var i = 0; i < colorsCards[lastGameCard.getColor()].length; ++i){
            currentCard = colorsCards[lastGameCard.getColor()][i];
            if(currentCard !== lastCardInTaki && currentCard.doOperation(lastGameCard)) {
                return currentCard;
            }
        }

        if(lastCardInTaki.doOperation(lastGameCard)){
            // takiMode = false;
            currentCard = lastCardInTaki;
            lastGameCard = null;
            return currentCard;
        }

        return null;
    }

    function takiOperationWithTwoPlayers(lastGameCard) {
        if(typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), different) !== null){
            lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), equal);
            if(lastCardInTaki !== null)
                return;
        }
        if(typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), different) !== null){
            lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), equal);
            if(lastCardInTaki !== null)
                return;
        }
        lastCardInTaki = connectionNumber(lastGameCard.getColor(), equal);
        if(lastCardInTaki !== null)
            return;
        if(typesCards[enumCard.enumTypes.CHANGE_COLOR].length > 0){
            lastCardInTaki = typesCards[enumCard.enumTypes.CHANGE_COLOR][0];
            return;
        }
        lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.TWO_PLUS, lastGameCard.getColor(), equal);
        if(lastCardInTaki !== null)
            return;
        lastCardInTaki = findColorCardNotInGivenType(lastGameCard.getColor(), enumCard.enumTypes.PLUS);
        if(lastCardInTaki !== null)
            return;
        if(colorsCards[lastGameCard.getColor()].length > 0)
            lastCardInTaki = colorsCards[lastGameCard.getColor()][0];
        else
            lastCardInTaki = null;
    }

    function takiOperationWithMorePlayers(lastGameCard) {
        if(typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), different) !== null){
            lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), equal);
            if(lastCardInTaki !== null)
                return;
        }
        lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.getColor(), equal);
        if(lastCardInTaki !== null)
            return;
        lastCardInTaki = connectionNumber(lastGameCard.getColor(), equal);
        if(lastCardInTaki !== null)
            return;
        if(typesCards[enumCard.enumTypes.CHANGE_COLOR].length > 0){
            lastCardInTaki = typesCards[enumCard.enumTypes.CHANGE_COLOR][0];
            return;
        }
        lastCardInTaki = findColorCardNotInGivenType(lastGameCard.getColor(), enumCard.enumTypes.PLUS);
        if(lastCardInTaki !== null)
            return;
        if(colorsCards[lastGameCard.getColor()].length > 0)
            lastCardInTaki = colorsCards[lastGameCard.getColor()][0];
        else
            lastCardInTaki = null;
    }

    function removeAllCardAppearances(card) {
        if(card.getColor() !== null)
            removeCard(colorsCards[card.getColor()], card);
        removeCard(typesCards[card.type], card);
        removeCard(playerCards, card);
    }

    function firstAvailableCard(lastGameCard) {
        for(var i = 0; i < playerCards.length; ++i){
            if(playerCards[i].doValidation(lastGameCard))
                return playerCards[i];
        }
        return null;
    }

    function regularOperation(lastGameCard) {
        var pickedCard = null;
        if(typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), different) === null){
            pickedCard = typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.getColor(), equal);
            if(pickedCard != null)
                return pickedCard;
        }
        if (numberOfPlayers === 2)
            pickedCard = regularOperationWithTwoPlayers(lastGameCard);
        else if (numberOfPlayers > 2)
            pickedCard = regularOperationWithMorePlayers(lastGameCard);
        return pickedCard;
    }

    function signOperation(lastGameCard) {
        var differentColorType = null;
        if (lastGameCard.getSign() !== enumCard.enumTypes.PLUS && lastGameCard.getSign() !== enumCard.enumTypes.STOP)
            return null;
        differentColorType = typeCardWithLeastSameColorInHand(lastGameCard.getSign());
        if (colorsCards[lastGameCard.getColor()].length > 0) {
            if (colorsCards[lastGameCard.getColor()].length <= colorsCards[differentColorType.getColor()].length)
                return regularOperation(lastGameCard);
        }
        return differentColorType;
    }

    function superTakiExecute(lastGameCard) {
        var pickedCard = null;
        if(colorsLeftAmount() === 1 && colorsCards[lastGameCard.getColor()].length > 0 &&
            typesCards[enumCard.enumTypes.SUPER_TAKI].length > 0){
            // takiMode = true;
            pickedCard = typesCards[enumCard.enumTypes.SUPER_TAKI][0];
        }
        return pickedCard;
    }

    function takiOperation(lastGameCard) {
        var pickedCard = null;
        if(takiMode === true){
            if(lastCardInTaki === null) {
                if (numberOfPlayers === 2)
                    takiOperationWithTwoPlayers(lastGameCard);
                else if (numberOfPlayers > 2)
                    takiOperationWithMorePlayers(lastGameCard);
            }
            pickedCard = colorCardInTaki(lastGameCard.getColor());
        }else{
            pickedCard = typeAndColorMatch(enumCard.enumTypes.TAKI, lastGameCard.getColor(), equal);
            /*if(pickedCard !== null && pickedCard.doOperation()){
                takiMode = true;
            }*/
        }
        return pickedCard;
    }

    function plusTwoOperation(lastGameCard) {
        if(lastGameCard.getSign() === enumCard.enumTypes.TWO_PLUS && lastGameCard.isActive())
            return typeCardWithLeastSameColorInHand(enumCard.enumTypes.TWO_PLUS);
        else
            return null;
    }

    function operation(lastGameCard){
        var pickedCard;
        pickedCard = plusTwoOperation(lastGameCard);
        if(pickedCard === null)
            pickedCard = takiOperation(lastGameCard);
        if(pickedCard === null)
            pickedCard = superTakiExecute(lastGameCard);
        if(pickedCard === null)
            pickedCard = signOperation(lastGameCard);
        if(pickedCard === null)
            pickedCard = regularOperation(lastGameCard);
        if(pickedCard === null){
            if (typesCards[enumCard.enumTypes.CHANGE_COLOR].length > 0)
                pickedCard = typesCards[enumCard.enumTypes.CHANGE_COLOR][0];
        }
        if(pickedCard === null)
            pickedCard = firstAvailableCard(lastGameCard);
        return pickedCard;
    }


    function addCard(cardsToAdd) {
        for(var i = 0; i < cardsToAdd.length; ++i){
            if(card.getColor() !== null)
                insertColor(cardsToAdd[i]);
            insertType(cardsToAdd[i]);
            playerCards.push(cardsToAdd[i]);
        }
    }

    return{
        setCards: function(cards, playersAmount){
            numberOfPlayers = playersAmount;
            setAllCards(cards);
            for(var i = 0; i < cards.length; ++i){
                cards[i].setParent(enumCard.dives.COMPUTER_CARDS);
                cards[i].changeCss(false);
            }
        },

        pullCardFromStock: function(cardsToAdd){
            addCard(cardsToAdd);
        },

        pickCard: function(lastGameCard){
            operation(lastGameCard);
        },

        reducePlayer: function(){
            numberOfPlayers = numberOfPlayers - 1;
        },

        doOperation: function(card) {
            var promote = card.doOperation();
            removeAllCardAppearances(card);
            if (promote === -1)
                takiMode = card;
            if (takiMode !== null)
                promote = takiModeChecker(playerCards);
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

        getCss: function () {
            return cardsCss;
        },
        isComputer: function () {
            return true;
        }
    }
}
function SmartComputer() {
    var colorsCards = [[], [], [], []];//sorting in enumColor sort
    var typesCards = [[], [], [], [], [], [], []];//sorting in enumType sort
    var playerCards = [];
    var takiMode = false;
    var numberOfPlayers;
    var lastCardInTaki = null;
    function insertColor(playerCard) {
        colorsCards[playerCard.color].push(playerCard);
    }

    function insertType(playerCard) {
        typesCards[playerCard.sign].push(playerCard);
    }

    function setAllCards() {
        for(var i = 0; i < playerCards.length; ++i){
            if(playerCards[i].color !== null)
                insertColor(playerCards[i]);
            insertType(playerCards[i]);
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
            if(matchFunc(typesCards[type][i].color, color))
                return typesCards[type][i];
        }
        return null;
    }

/*


    //find the first card in given type that have same color in given
    function typeInColor(type, color) {
        for(var i = 0; i < typesCards[type].length; ++i){
            if(typesCards[type][i].color === color)
                return typesCards[type][i];
        }
        return null;
    }

    //find the first card in given type that have different color from given
    function typesInDifferentColor(type, color) {
        for(var i = 0; i < typesCards[type].length; ++i){
            if(typesCards[type][i].color !== color)
                return typesCards[type][i];
        }
        return null;
    }
*/

    function connectionNumber(color, matchFunc) {
        var card = null;
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].sign === Card.enumTypes.NUMBER)
                card = cardNumberInDifferentColor(colorsCards[color][i]);
            if(matchFunc(card,null)) {
                if(card !== null)
                    return card;
                else
                    return colorsCards[color][i];
            }
        }
        return card;
    }

/*
    //find the first card number(different color), that have matching number in the given color
    function findFirstConnectionNumber(color) {
        var card = null;
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].sign === Card.enumTypes.NUMBER)
                card = cardNumberInDifferentColor(colorsCards[color][i]);
            if(card !== null)
                return card;
        }
        return card;
    }

    //find the first card number that have no matching number in the other colors
    function findFirstNoConnectionNumber(color) {
        var card = null;
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].sign === Card.enumTypes.NUMBER)
                card = cardNumberInDifferentColor(colorsCards[color][i]);
            if(card === null)
                return colorsCards[color][i];
        }
        return card;
    }
*/

    //find if there is same number, in different color
    function cardNumberInDifferentColor(card) {
        //var cards = [];
        for(var i = 0; i < typesCards[Card.enumTypes.NUMBER].length; ++i){
            var numberCard = typesCards[Card.enumTypes.NUMBER][i];
            if(numberCard.color !== card.color && numberCard.number === card.number)
                return true;
                //cards.push(numberCard);
        }
        //return cards;
        return false;
    }

    //find the given type in the most least color in hand
    function typeCardWithLeastSameColorInHand(type) {
        var card = null;
        for(var i = 0; i < typesCards[type].length; ++i) {
            var currentCard = typesCards[type][i];
            if(card === null)
                card = currentCard;
            else if(colorsCards[card.color].length > colorsCards[currentCard.color].length)
                card = currentCard;
        }
        return card;
    }

    //search for the first same color, in different type
    function findColorCardNotInGivenType(color, type) {
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].sign !== type)
                return colorsCards[color][i];
        }
        return null;
    }

    function removeCard(array, card) {
        for(var i = 0; i < array.length; ++i) {
            if(array[i] === card) {
                array.splice(i, 1);
                return;
            }
        }
    }

    function regularOperationWithTwoPlayers(lastGameCard) {
        var card;
        card = typeAndColorMatch(Card.enumTypes.STOP, lastGameCard.color, equal);
        if(card !== null)
            return card;
        card = connectionNumber(lastGameCard.color, different);
        if(card !== null)
            return card;
        card = connectionNumber(lastGameCard.color, equal);
        if(card !== null)
            return card;
        card = typeAndColorMatch(Card.enumTypes.TWO_PLUS, lastGameCard.color, equal);
        if(card !== null)
            return card;
        card = typeAndColorMatch(Card.enumTypes.STOP, lastGameCard.color, equal);
        if(card !== null)
            return card;
        return typeAndColorMatch(Card.enumTypes.PLUS, lastGameCard.color, equal);
    }

    function regularOperationWithMorePlayers(lastGameCard) {
        var card;
        card = connectionNumber(lastGameCard.color, different);
        if(card !== null)
            return card;
        card = connectionNumber(lastGameCard.color, equal);
        if(card !== null)
            return card;
        card = typeAndColorMatch(Card.enumTypes.PLUS, lastGameCard.color, equal);
        if(card !== null)
            return card;
        card = typeAndColorMatch(Card.enumTypes.STOP, lastGameCard.color, equal);
        if(card !== null)
            return card;
        return typeAndColorMatch(Card.enumTypes.TWO_PLUS, lastGameCard.color, equal);
    }

    function colorCardInTaki(lastGameCard) {
        var currentCard;
        for(var i = 0; i < colorsCards[lastGameCard.color].length; ++i){
            currentCard = colorsCards[lastGameCard.color][i];
            if(currentCard !== lastCardInTaki && currentCard.doOperation(lastGameCard)) {
                return currentCard;
            }
        }

        if(lastCardInTaki.doOperation(lastGameCard)){
            takiMode = false;
            currentCard = lastCardInTaki;
            lastGameCard = null;
            return currentCard;
        }

        return null;
    }

    function takiOperationWithTwoPlayers(lastGameCard) {
        if(typeAndColorMatch(Card.enumTypes.PLUS, lastGameCard.color, different) !== null){
            lastCardInTaki = typeAndColorMatch(Card.enumTypes.PLUS, lastGameCard.color, equal);
            if(lastCardInTaki !== null)
                return;
        }
        if(typeAndColorMatch(Card.enumTypes.STOP, lastGameCard.color, different) !== null){
            lastCardInTaki = typeAndColorMatch(Card.enumTypes.STOP, lastGameCard.color, equal);
            if(lastCardInTaki !== null)
                return;
        }
        lastCardInTaki = connectionNumber(lastGameCard.color, equal);
        if(lastCardInTaki !== null)
            return;
        if(typesCards[Card.enumTypes.CHANGE_COLOR].length > 0){
            lastCardInTaki = typesCards[Card.enumTypes.CHANGE_COLOR][0];
            return;
        }
        lastCardInTaki = typeAndColorMatch(Card.enumTypes.TWO_PLUS, lastGameCard.color, equal);
        if(lastCardInTaki !== null)
            return;
        lastCardInTaki = findColorCardNotInGivenType(lastGameCard.color, Card.enumTypes.PLUS);
        if(lastCardInTaki !== null)
            return;
        if(colorsCards[lastGameCard.color].length > 0)
            lastCardInTaki = colorsCards[lastGameCard.color][0];
        else
            lastCardInTaki = null;
    }

    function takiOperationWithMorePlayers(lastGameCard) {
        if(typeAndColorMatch(Card.enumTypes.PLUS, lastGameCard.color, different) !== null){
            lastCardInTaki = typeAndColorMatch(Card.enumTypes.PLUS, lastGameCard.color, equal);
            if(lastCardInTaki !== null)
                return;
        }
        lastCardInTaki = typeAndColorMatch(Card.enumTypes.STOP, lastGameCard.color, equal);
        if(lastCardInTaki !== null)
            return;
        lastCardInTaki = connectionNumber(lastGameCard.color, equal);
        if(lastCardInTaki !== null)
            return;
        if(typesCards[Card.enumTypes.CHANGE_COLOR].length > 0){
            lastCardInTaki = typesCards[Card.enumTypes.CHANGE_COLOR][0];
            return;
        }
        lastCardInTaki = findColorCardNotInGivenType(lastGameCard.color, Card.enumTypes.PLUS);
        if(lastCardInTaki !== null)
            return;
        if(colorsCards[lastGameCard.color].length > 0)
            lastCardInTaki = colorsCards[lastGameCard.color][0];
        else
            lastCardInTaki = null;
    }

    function removeAllCardAppearances(card) {
        if(card.color !== null)
            removeCard(colorsCards[card.color], card);
        removeCard(typesCards[card.type], card);
        removeCard(playerCards, card);
    }

    function firstAvailableCard(lastGameCard) {
        for(var i = 0; i < playerCards.length; ++i){
            if(playerCards[i].doOperation(lastGameCard))
                return playerCards[i];
        }
        return null;
    }

    function regularOperation(lastGameCard) {
        var card = null;
        if(colorsCards[lastGameCard.color].length > 0) {
            if(typeAndColorMatch(Card.enumTypes.PLUS, lastGameCard.color, different) === null){
                card = typeAndColorMatch(Card.enumTypes.PLUS, lastGameCard.color, equal);
            }
            if (numberOfPlayers === 2)
                card = regularOperationWithTwoPlayers(lastGameCard);
            else if (numberOfPlayers > 2)
                card = regularOperationWithMorePlayers(lastGameCard);
        }
        return card;
    }

    function signOperation(lastGameCard) {
        var differentColorType;
        if (lastGameCard.sign !== Card.enumTypes.PLUS && lastGameCard.sign !== Card.enumTypes.STOP)
            return null;
        differentColorType = typeCardWithLeastSameColorInHand(lastGameCard.sign);
        if (colorsCards[lastGameCard.color].length > 0) {
            if (colorsCards[lastGameCard.color].length <= colorsCards[differentColorType.color].length)
                return regularOperation(lastGameCard);
        }
        return differentColorType;
    }

    function superTakiExecute(lastGameCard) {
        var card = null;
        if(colorsLeftAmount() === 1 && colorsCards[lastGameCard.color].length > 0 &&
            typesCards[Card.enumTypes.SUPER_TAKI].length > 0){
            takiMode = true;
            card = typesCards[Card.enumTypes.SUPER_TAKI][0];
        }
        return card;
    }

    function takiOperation(lastGameCard) {
        var card = null;
        if(takiMode === true){
            if(lastCardInTaki === null) {
                if (numberOfPlayers === 2)
                    takiOperationWithTwoPlayers(lastGameCard);
                else if (numberOfPlayers > 2)
                    takiOperationWithMorePlayers(lastGameCard);
            }
            card = colorCardInTaki(lastGameCard.color);
        }else{
            card = typeAndColorMatch(Card.enumTypes.TAKI, lastGameCard.color, equal);
            if(card !== null && card.doOperation()){
                takiMode = true;
            }
        }
        return card;
    }

    function plusTwoOperation(lastGameCard) {
        if(lastGameCard.sign === Card.enumTypes.TWO_PLUS && lastGameCard.isActive())
            return typeCardWithLeastSameColorInHand(Card.enumTypes.TWO_PLUS);
    }

    function operation(lastGameCard){
        var card;
        card = plusTwoOperation(lastGameCard);
        if(card === null)
            card = takiOperation(lastGameCard);
        if(card === null)
            card = superTakiExecute(lastGameCard);
        if(card === null)
            card = signOperation(lastGameCard);
        if(card === null)
            card = regularOperation(lastGameCard);
        if(card === null){
            if (typesCards[Card.enumTypes.CHANGE_COLOR].length > 0)
                card = typesCards[Card.enumTypes.CHANGE_COLOR][0];
        }
        if(card === null)
            card = firstAvailableCard(lastGameCard);
        if(card !== null)
            removeAllCardAppearances(card);
        return card;
    }


    function addCard(card) {
        if(card.color !== null)
            insertColor(card);
        insertType(card);
    }

    return{
        setCards: function(cards, playersAmount){
            numberOfPlayers = playersAmount;
            playerCards = cards;
            setAllCards();
        },

        pullCardFromStock: function(card){
            addCard(card);
        },

        doOperation: function(){
            operation();
        },

        reducePlayer: function(){
            numberOfPlayers = numberOfPlayers - 1;
        }
    }
}
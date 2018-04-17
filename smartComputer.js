var smartComputer = function() {
    var colorsCards = [[], [], [], []];//sorting in enumColor sort
    var typesCards = [[], [], [], [], [], [], []];//sorting in enumType sort
    var playerCards = [];
    var takiMode = false;
    var numberOfPlayers;
    var lastCardInTaki = null;
   /* var pullApprovalFunc = pullApproval;
    var takiCheckerFunc = takiChecker;
    var removeCardFunc = removeCard;
    var searchCardFunc = searchCard;*/
    var singleCardCounter = 0;
    var cardsCss = enumCard.cssStyle.CLOSE_CARDS;

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
        var pickedCard = null;
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].sign === enumCard.enumTypes.NUMBER)
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
    //find the first card number(different color), that have matching number in the given color
    function findFirstConnectionNumber(color) {
        var card = null;
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].sign === enumCard.enumTypes.NUMBER)
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
            if(colorsCards[color][i].sign === enumCard.enumTypes.NUMBER)
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
        for(var i = 0; i < typesCards[enumCard.enumTypes.NUMBER].length; ++i){
            var numberCard = typesCards[enumCard.enumTypes.NUMBER][i];
            if(numberCard.color !== card.color && numberCard.number === card.number)
                return true;
                //cards.push(numberCard);
        }
        //return cards;
        return false;
    }

    //find the given type in the most least color in hand
    function typeCardWithLeastSameColorInHand(type) {
        var pickedCard = null;
        for(var i = 0; i < typesCards[type].length; ++i) {
            var currentCard = typesCards[type][i];
            if(pickedCard === null)
                pickedCard = currentCard;
            else if(colorsCards[pickedCard.color].length > colorsCards[currentCard.color].length)
                pickedCard = currentCard;
        }
        return pickedCard;
    }

    //search for the first same color, in different type
    function findColorCardNotInGivenType(color, type) {
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].sign !== type)
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
        pickedCard = typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.color, equal);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = connectionNumber(lastGameCard.color, different);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = connectionNumber(lastGameCard.color, equal);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = typeAndColorMatch(enumCard.enumTypes.TWO_PLUS, lastGameCard.color, equal);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.color, equal);
        if(pickedCard !== null)
            return pickedCard;
        return typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.color, equal);
    }

    function regularOperationWithMorePlayers(lastGameCard) {
        var pickedCard;
        pickedCard = connectionNumber(lastGameCard.color, different);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = connectionNumber(lastGameCard.color, equal);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = typeAndColorMatch(card.enumTypes.PLUS, lastGameCard.color, equal);
        if(pickedCard !== null)
            return pickedCard;
        pickedCard = typeAndColorMatch(card.enumTypes.STOP, lastGameCard.color, equal);
        if(pickedCard !== null)
            return pickedCard;
        return typeAndColorMatch(card.enumTypes.TWO_PLUS, lastGameCard.color, equal);
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
            // takiMode = false;
            currentCard = lastCardInTaki;
            lastGameCard = null;
            return currentCard;
        }

        return null;
    }

    function takiOperationWithTwoPlayers(lastGameCard) {
        if(typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.color, different) !== null){
            lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.color, equal);
            if(lastCardInTaki !== null)
                return;
        }
        if(typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.color, different) !== null){
            lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.color, equal);
            if(lastCardInTaki !== null)
                return;
        }
        lastCardInTaki = connectionNumber(lastGameCard.color, equal);
        if(lastCardInTaki !== null)
            return;
        if(typesCards[enumCard.enumTypes.CHANGE_COLOR].length > 0){
            lastCardInTaki = typesCards[enumCard.enumTypes.CHANGE_COLOR][0];
            return;
        }
        lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.TWO_PLUS, lastGameCard.color, equal);
        if(lastCardInTaki !== null)
            return;
        lastCardInTaki = findColorCardNotInGivenType(lastGameCard.color, enumCard.enumTypes.PLUS);
        if(lastCardInTaki !== null)
            return;
        if(colorsCards[lastGameCard.color].length > 0)
            lastCardInTaki = colorsCards[lastGameCard.color][0];
        else
            lastCardInTaki = null;
    }

    function takiOperationWithMorePlayers(lastGameCard) {
        if(typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.color, different) !== null){
            lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.color, equal);
            if(lastCardInTaki !== null)
                return;
        }
        lastCardInTaki = typeAndColorMatch(enumCard.enumTypes.STOP, lastGameCard.color, equal);
        if(lastCardInTaki !== null)
            return;
        lastCardInTaki = connectionNumber(lastGameCard.color, equal);
        if(lastCardInTaki !== null)
            return;
        if(typesCards[enumCard.enumTypes.CHANGE_COLOR].length > 0){
            lastCardInTaki = typesCards[enumCard.enumTypes.CHANGE_COLOR][0];
            return;
        }
        lastCardInTaki = findColorCardNotInGivenType(lastGameCard.color, enumCard.enumTypes.PLUS);
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
            if(playerCards[i].doValidation(lastGameCard))
                return playerCards[i];
        }
        return null;
    }

    function regularOperation(lastGameCard) {
        var pickedCard = null;
        if(colorsCards[lastGameCard.color].length > 0) {
            if(typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.color, different) === null){
                pickedCard = typeAndColorMatch(enumCard.enumTypes.PLUS, lastGameCard.color, equal);
            }
            if (numberOfPlayers === 2)
                pickedCard = regularOperationWithTwoPlayers(lastGameCard);
            else if (numberOfPlayers > 2)
                pickedCard = regularOperationWithMorePlayers(lastGameCard);
        }
        return pickedCard;
    }

    function signOperation(lastGameCard) {
        var differentColorType;
        if (lastGameCard.sign !== enumCard.enumTypes.PLUS && lastGameCard.sign !== enumCard.enumTypes.STOP)
            return null;
        differentColorType = typeCardWithLeastSameColorInHand(lastGameCard.sign);
        if (colorsCards[lastGameCard.color].length > 0) {
            if (colorsCards[lastGameCard.color].length <= colorsCards[differentColorType.color].length)
                return regularOperation(lastGameCard);
        }
        return differentColorType;
    }

    function superTakiExecute(lastGameCard) {
        var pickedCard = null;
        if(colorsLeftAmount() === 1 && colorsCards[lastGameCard.color].length > 0 &&
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
            pickedCard = colorCardInTaki(lastGameCard.color);
        }else{
            pickedCard = typeAndColorMatch(card.enumTypes.TAKI, lastGameCard.color, equal);
            /*if(pickedCard !== null && pickedCard.doOperation()){
                takiMode = true;
            }*/
        }
        return pickedCard;
    }

    function plusTwoOperation(lastGameCard) {
        if(lastGameCard.sign === enumCard.enumTypes.TWO_PLUS && lastGameCard.isActive())
            return typeCardWithLeastSameColorInHand(enumCard.enumTypes.TWO_PLUS);
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
            if (typesCards[card.enumTypes.CHANGE_COLOR].length > 0)
                pickedCard = typesCards[card.enumTypes.CHANGE_COLOR][0];
        }
        if(pickedCard === null)
            pickedCard = firstAvailableCard(lastGameCard);
        return pickedCard;
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

        pickCard: function(){
            operation();
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
        }
    }
}
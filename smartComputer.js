function SmartComputer() {
    var colorsCards = [[], [], [], []];//sorting in enumColor sort
    var typesCards = [[], [], [], [], [], [], []];//sorting in enumType sort
    var playerCards = [];
    var takiMode = false;
    var numberOfPlayers;
    var lastCardInTaki = null;
    function insertColor(playerCard) {
        colorsCards[playerCard.color].push(playerCard);
        /*if(playerCard.color === Card.enumColor.GREEN ){
            greenCards.push(playerCard);
        }
        else if(playerCard.color === Card.enumColor.YELLOW )
            yellowCards.push(playerCard);
        else if(playerCard.color === Card.enumColor.BLUE )
            blueCards.push(playerCard);
        else if(playerCard.color === Card.enumColor.RED )
            redCards.push(playerCard);*/

    }

    function insertType(playerCard) {
        typesCards[playerCard.sign].push(playerCard);
        /*if(playerCard instanceof TwoPlus)
            twoPlusCards.push(playerCard);
        else if(playerCard instanceof Stop)
            stopCards.push(playerCard);
        else if(playerCard instanceof ChangeColorCard)
            changeColorCards.push(playerCard);
        else if(playerCard instanceof Plus)
            PlusCards.push(playerCard);
        else if(playerCard instanceof Taki)
            takiCards.push(playerCard);
        else if(playerCard instanceof SuperTaki)
            superTakiCards.push(playerCard);
        else
            NumberCards.push(playerCard);*/

    }

    function setAllCards() {
        for(var i = 0; i < playerCards.length; ++i){
            insertColor(playerCards[i]);
            insertType(playerCards[i]);
        }
    }

    function takiInColor(lastGameCard) {
        for(var i = 0; i < typesCards[Card.enumTypes.TAKI].length; ++i){
            if(typesCards[Card.enumTypes.TAKI][i].color === lastGameCard.color)
                return true;
        }
        return false;
    }

    function colorsLeftAmount() {
        var colors = 0;
        for(var i = 0; i < colorsCards.length; ++i){
            if(colorsCards[i].length > 0)
                colors++;
        }
        return colors;
    }

    function typeInColor(type, color) {
        for(var i = 0; i < typesCards[type].length; ++i){
            if(typesCards[type][i].color === color)
                return typesCards[type];
        }
        return null;
    }

    function typesInDifferentColor(type, color) {
        var cards = [];
        for(var i = 0; i < typesCards[type].length; ++i){
            if(typesCards[type][i].color !== color)
                cards.push(typesCards[type][i]);
        }
        return cards;
    }

    function findNumberInGivenColorAndInDifferentColor(color) {
        var card = null;
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].sign === Card.enumTypes.NUMBER)
                card = cardNumberInDifferentColor(colorsCards[color][i]);
            if(card !== null)
                return card;
        }
        return card;
    }

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
    
    function typeCardWithLeastSameColorInHand(type) {
        var card = null;
        for(var i = 0; i < typesCards[type].length; ++i) {
            var currentCard = typesCards[Card.enumTypes.NUMBER][i];
            if(card === null)
                card = currentCard;
            else if(colorsCards[card.color].length > colorsCards[currentCard.color].length)
                card = currentCard;
        }
        return card;
    }

    function findColorCardNotInGivenType(color, type) {
        for(var i = 0; i < colorsCards[color].length; ++i){
            if(colorsCards[color][i].sign !== type)
                return colorsCards[color][i];
        }
        return null;
    }

    function takiOperationWithTwoPlayers(lastGameCard) {
        if(typesInDifferentColor(Card.enumTypes.PLUS, lastGameCard.color) !== null){
            lastCardInTaki = typeInColor(Card.enumTypes.PLUS, lastGameCard.color);
            if(lastCardInTaki !== null)
                return;
        }
        if(typesInDifferentColor(Card.enumTypes.STOP, lastGameCard.color) !== null){
            lastCardInTaki = typeInColor(Card.enumTypes.STOP, lastGameCard.color);
            if(lastCardInTaki !== null)
                return;
        }
        lastCardInTaki = findNumberInGivenColorAndInDifferentColor(lastGameCard.color);
        if(lastCardInTaki !== null)
            return;
        if(typesCards[Card.enumTypes.CHANGE_COLOR].length > 0){
            lastCardInTaki = typesCards[Card.enumTypes.CHANGE_COLOR][0];
            return;
        }
        lastCardInTaki = typeInColor(Card.enumTypes.TWO_PLUS, lastGameCard.color);
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
        if(typesInDifferentColor(Card.enumTypes.PLUS, lastGameCard.color) !== null){
            lastCardInTaki = typeInColor(Card.enumTypes.PLUS, lastGameCard.color);
            if(lastCardInTaki !== null)
                return;
        }
        lastCardInTaki = typeInColor(Card.enumTypes.STOP, lastGameCard.color);
        if(lastCardInTaki !== null)
            return;
        lastCardInTaki = findNumberInGivenColorAndInDifferentColor(lastGameCard.color);
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

    function removeCard(array, card) {
        for(var i = 0; i < array.length; ++i) {
            if(array[i] === card) {
                array.splice(i, 1);
                return;
            }
        }
    }

    function colorCardInTaki(lastGameCard) {
        var currentCard;
        for(var i = 0; i < colorsCards[lastGameCard.color].length; ++i){
            currentCard = colorsCards[lastGameCard.color][i];
            if(currentCard !== lastCardInTaki && currentCard.doOperation(lastGameCard)) {
                removeCard(playerCards, currentCard);
                removeCard(typesCards[currentCard.sign], currentCard);
                colorsCards[lastGameCard.color].splice(i, 1);
                return currentCard;
            }
        }

        if(lastCardInTaki.doOperation(lastGameCard)){
            if(colorsCards[lastGameCard.color].length === 1)
                takiMode = false;
            return lastCardInTaki;
        }
        return null;
    }

    function operation(lastGameCard){
        var card;
        if(takiMode === true){
            if(lastCardInTaki === null) {
                if (numberOfPlayers === 2)
                    takiOperationWithTwoPlayers(lastGameCard);
                else if (numberOfPlayers > 2)
                    takiOperationWithMorePlayers(lastGameCard);
            }
            return colorCardInTaki(lastGameCard.color);
        }
        else if(lastGameCard instanceof TwoPlus && lastGameCard.isActive())
            return typeCardWithLeastSameColorInHand(Card.enumTypes.TWO_PLUS);
        card = typeInColor(Card.enumTypes.TAKI, lastGameCard.color);
        if(card !== null && card.doOperation()){
            takiMode = true;
            return card;
        }

    }


    return{
        setCards: function(cards, playersAmount){
            numberOfPlayers = playersAmount;
            playerCards = cards;
            setAllCards();
        },

        doOperation: operation(),

        reducePlayer: numberOfPlayers -= 1
    }
}
var stock = function () {
    var cards = [];
    var twoCardsNumber = [1, 3, 4, 5, 6, 7, 8, 9];
    var id = 0;
    var css;
    function CreateDeck() {
        for(var number = 0; number < twoCardsNumber.length; ++number){
            for (var color = 0; color < enumCard.enumColor.length; ++color) {
                css = getNumberUniqueCss(Object.keys(enumCard.enumColor)[i], twoCardsNumber[number].toString());

                cards.push(card(enumCard.enumColor[i], enumCard.enumTypes.NUMBER,
                    numberValidation, numberOperation, id++, css));
                cards[cards.length-1].number = twoCardsNumber[number];

                cards.push(card(enumCard.enumColor[i], enumCard.enumTypes.NUMBER,
                    numberValidation, numberOperation, id++));
                cards[cards.length-1].number = twoCardsNumber[number];
            }
        }

        for (color = 0; color < enumCard.enumColor.length; ++color) {
            css = getNumberUniqueCss(Object.keys(enumCard.enumColor)[i], enumCard.enumTypes.TAKI);
            cards.push(card(enumCard.enumColor[i], enumCard.enumTypes.TAKI,
                takiValidation, takiOperation, id++, css));

            cards.push(card(enumCard.enumColor[i], enumCard.enumTypes.TAKI,
                takiValidation, takiOperation, id++));

            cards.push(card(enumCard.enumColor[i], enumCard.enumTypes.STOP,
                stopValidation, stopOperation, id++));
            cards.push(card(enumCard.enumColor[i], enumCard.enumTypes.STOP,
                stopValidation, stopOperation, id++));
            cards.push(card(enumCard.enumColor[i], enumCard.enumTypes.TWO_PLUS,
                twoPlusValidation, twoPlusOperation, id++));
            cards.push(card(enumCard.enumColor[i], enumCard.enumTypes.TWO_PLUS,
                twoPlusValidation, twoPlusOperation, id++));
            cards.push(card(enumCard.enumColor[i], enumCard.enumTypes.PLUS,
                plusValidation, plusOperation, id++));
            cards.push(card(enumCard.enumColor[i], enumCard.enumTypes.PLUS,
                plusValidation, plusOperation, id++));
            cards.push(card(null, enumCard.enumTypes.CHANGE_COLOR,
                changeColorValidation, changeColorOperation, id++));
        }

        for(var i = 0; i < 2; ++i){
            cards.push(card(null, enumCard.enumTypes.SUPER_TAKI,
                superTakiValidation, superTakiOperation, id++));
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffleDeck(shuffleCnt) {
        for(var i = 0; i < shuffleCnt; i++) {
            var rndNo = getRandomInt(0, 101);
            var card = cards[i];
            cards[i] = cards[rndNo];
            cards[rndNo] = card;
        }
    }
    ////*************************************************
    function randomSort() {
        CreateDeck();
        shuffleDeck(getRandomInt(10, 25));//random number (the numbers not very important),amount of times to make shuffle
    }

    return{
        //set 8 cards for player
        getCards: function(number) {
            return cards.splice(0, number);
        },

        reShuffle: function() {
            randomSort();
            return cards;
        }
    };
};

/*function Stock() {
    var cards;

    ////*********************************************
    var twoCardsNumber = [1, 3, 4, 5, 6, 7, 8, 9];

    function CreateDeck() {
        for(var number = 0; number < twoCardsNumber.length; ++number){
            for (var color = 0; color < Card.enumColor.length; ++color) {
                cards.push(new NumberCard(twoCardsNumber[number], Card.enumColor[i]));
                cards.push(new NumberCard(twoCardsNumber[number], Card.enumColor[i]));
            }
        }

        for (color = 0; color < Card.enumColor.length; ++color) {
            cards.push(new Taki(Card.enumColor[i]));
            cards.push(new Taki(Card.enumColor[i]));
            cards.push(new Stop(Card.enumColor[i]));
            cards.push(new Stop(Card.enumColor[i]));
            cards.push(new TwoPlus(Card.enumColor[i]));
            cards.push(new TwoPlus(Card.enumColor[i]));
            cards.push(new Plus(Card.enumColor[i]));
            cards.push(new Plus(Card.enumColor[i]));
            cards.push(new ChangeColorCard());
        }

        for(var i = 0; i < 2; ++i){
            cards.push(new SuperTaki());
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffleDeck(shuffleCnt) {
        for(var i = 0; i < shuffleCnt; i++) {
            var rndNo = getRandomInt(0, 101);
            var card = cards[i];
            cards[i] = cards[rndNo];
            cards[rndNo] = card;
        }
    }
    ////*************************************************
    function randomSort() {
        CreateDeck();
        shuffleDeck(getRandomInt(10, 25));//random number (the numbers not very important),amount of times to make shuffle
    }

    return{
        //set 8 cards for player
        getCards: function(number) {
            return cards.splice(0, number);
        },

        reShuffle: function() {
            randomSort();
            return cards;
        }
    };
}
*/

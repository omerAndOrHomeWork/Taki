var stock = (function () {
    var cards = [];
    var twoCardsNumber = [1, 3, 4, 5, 6, 7, 8, 9];
    var colorNumber = [enumCard.enumColor.RED, enumCard.enumColor.BLUE,
        enumCard.enumColor.GREEN, enumCard.enumColor.YELLOW];
    var id = 0;
    var css;
    function createDeck() {
        for(var number = 0; number < twoCardsNumber.length; ++number){
            for (var color = 0; color < colorNumber.length; ++color) {
                css = getUniqueCss(Object.keys(enumCard.enumColor)[color], twoCardsNumber[number].toString(),'_');

                cards.push(card(colorNumber[color], enumCard.enumTypes.NUMBER,
                    numberValidation, numberOperation, id++));
                cards[cards.length-1].number = twoCardsNumber[number];
                cards[cards.length-1].setCss(css);
                console.log(cards[number + color].getColor());
                console.log(cards[number + color].getSign());
                cards.push(new card(colorNumber[color], enumCard.enumTypes.NUMBER,
                    numberValidation, numberOperation, id++));
                cards[cards.length-1].number = twoCardsNumber[number];
                cards[cards.length-1].setCss(css);

            }
        }

        for (color = 0; color < colorNumber.length; ++color) {
            css = getUniqueCss(Object.keys(enumCard.enumColor)[color], Object.keys(enumCard.enumTypes)[4],'_');
            cards.push(new card(colorNumber[color], enumCard.enumTypes.TAKI,
                takiValidation, takiOperation, id++));
            cards[cards.length-1].setCss(css);
            cards.push(new card(colorNumber[color], enumCard.enumTypes.TAKI,
                takiValidation, takiOperation, id++));
            cards[cards.length-1].setCss(css);

            css = getUniqueCss(Object.keys(enumCard.enumColor)[color], Object.keys(enumCard.enumTypes)[0],'_');
            cards.push(new card(colorNumber[color], enumCard.enumTypes.STOP,
                stopValidation, stopOperation, id++));
            cards[cards.length-1].setCss(css);
            cards.push(new card(colorNumber[color], enumCard.enumTypes.STOP,
                stopValidation, stopOperation, id++));
            cards[cards.length-1].setCss(css);

            css = getUniqueCss(Object.keys(enumCard.enumColor)[color], Object.keys(enumCard.enumTypes)[6],'_');
            cards.push(new card(colorNumber[color], enumCard.enumTypes.TWO_PLUS,
                twoPlusValidation, twoPlusOperation, id++));
            cards[cards.length-1].setCss(css);
            cards.push(new card(colorNumber[color], enumCard.enumTypes.TWO_PLUS,
                twoPlusValidation, twoPlusOperation, id++));
            cards[cards.length-1].setCss(css);

            css = getUniqueCss(Object.keys(enumCard.enumColor)[color], Object.keys(enumCard.enumTypes)[2],'_');
            cards.push(new card(colorNumber[color], enumCard.enumTypes.PLUS,
                plusValidation, plusOperation, id++));
            cards[cards.length-1].setCss(css);
            cards.push(new card(colorNumber[color], enumCard.enumTypes.PLUS,
                plusValidation, plusOperation, id++));
            cards[cards.length-1].setCss(css);

            css = getUniqueCss('', Object.keys(enumCard.enumTypes)[1],'');
            cards.push(new card(null, enumCard.enumTypes.CHANGE_COLOR,
                changeColorValidation, changeColorOperation, id++));
            cards[cards.length-1].setCss(css);

        }

        css = getUniqueCss('', Object.keys(enumCard.enumTypes)[5],'');
        for(var color = 0; color < 2; ++color){
            cards.push(new card(null, enumCard.enumTypes.SUPER_TAKI,
                superTakiValidation, superTakiOperation, id++));
            cards[cards.length-1].setCss(css);
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
        createDeck();
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
        },

        setGame: function () {
            createDeck();
            shuffleDeck(getRandomInt(10, 25));//random number (the numbers not very important),amount of times to make shuffle
        }
    };
})();

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

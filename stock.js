var stock = (function () {
    var cards = [];
    var twoCardsNumber = [1, 3, 4, 5, 6, 7, 8, 9];
    var colorNumber = [enumCard.enumColor.RED, enumCard.enumColor.BLUE,
        enumCard.enumColor.GREEN, enumCard.enumColor.YELLOW];
    var id = 0;
    var css;
    var htmlStock;

    function createDeck() {
        htmlStock = document.createElement("div");
        htmlStock.setAttribute("id", enumCard.dives.STOCK);
        document.getElementById(enumCard.dives.STOCK_PARENT).appendChild(htmlStock);
        for(var number = 0; number < twoCardsNumber.length; ++number){
            for (var color = 0; color < colorNumber.length; ++color) {
                css = getUniqueCss(Object.keys(enumCard.enumColor)[color], twoCardsNumber[number].toString(),'_');


                cards.push(new Card(colorNumber[color], enumCard.enumTypes.NUMBER,
                    numberValidation, numberOperation, id++));
                cards[cards.length-1].number = twoCardsNumber[number];
                cards[cards.length-1].setElement(css);

                cards.push(new Card(colorNumber[color], enumCard.enumTypes.NUMBER,
                    numberValidation, numberOperation, id++));
                cards[cards.length-1].number = twoCardsNumber[number];
                cards[cards.length-1].setElement(css);
            }
        }

        for (color = 0; color < colorNumber.length; ++color) {
            css = getUniqueCss(Object.keys(enumCard.enumColor)[color], Object.keys(enumCard.enumTypes)[4],'_');
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.TAKI,
                takiValidation, takiOperation, id++));
            cards[cards.length-1].setElement(css);
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.TAKI,
                takiValidation, takiOperation, id++));
            cards[cards.length-1].setElement(css);

            css = getUniqueCss(Object.keys(enumCard.enumColor)[color], Object.keys(enumCard.enumTypes)[0],'_');
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.STOP,
                stopValidation, stopOperation, id++));
            cards[cards.length-1].setElement(css);
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.STOP,
                stopValidation, stopOperation, id++));
            cards[cards.length-1].setElement(css);

            css = getUniqueCss(Object.keys(enumCard.enumColor)[color], Object.keys(enumCard.enumTypes)[6],'_');
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.TWO_PLUS,
                twoPlusValidation, twoPlusOperation, id++));
            cards[cards.length-1].setElement(css);
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.TWO_PLUS,
                twoPlusValidation, twoPlusOperation, id++));
            cards[cards.length-1].setElement(css);

            css = getUniqueCss(Object.keys(enumCard.enumColor)[color], Object.keys(enumCard.enumTypes)[2],'_');
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.PLUS,
                plusValidation, plusOperation, id++));
            cards[cards.length-1].setElement(css);
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.PLUS,
                plusValidation, plusOperation, id++));
            cards[cards.length-1].setElement(css);

            css = getUniqueCss('', Object.keys(enumCard.enumTypes)[1],'');
            cards.push(new Card(undefined, enumCard.enumTypes.CHANGE_COLOR,
                changeColorValidation, changeColorOperation, id++));
            cards[cards.length-1].setElement(css);

        }

        css = getUniqueCss('', Object.keys(enumCard.enumTypes)[5],'');
        for(color = 0; color < 2; ++color){
            cards.push(new Card(undefined, enumCard.enumTypes.SUPER_TAKI,
                superTakiValidation, superTakiOperation, id++));
            cards[cards.length-1].setElement(css);
        }
        var blue_change_color = document.createElement("img");
        var green_change_color = document.createElement("img");
        var red_change_color = document.createElement("img");
        var yellow_change_color = document.createElement("img");
        blue_change_color.src = "../Taki/Images/blue/blue_change_color.png";
        green_change_color.src = "../Taki/Images/green/green_change_color.png";
        red_change_color.src = "../Taki/Images/red/red_change_color.png";
        yellow_change_color.src = "../Taki/Images/yellow/yellow_change_color.png";
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffleDeck(shuffleCnt) {
        for(var i = 0; i < shuffleCnt; i++) {
            var rndNo = getRandomInt(0, 101);
            var Card = cards[i];
            cards[i] = cards[rndNo];
            cards[rndNo] = Card;
        }
    }

    function randomSort() {
        createDeck();
        shuffleDeck(getRandomInt(10, 25));//random number (the numbers not very important),amount of times to make shuffle
    }

    return{
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
        },

        getValidOpenCard: function () {
            for(var i = 0; i < cards.length; ++i){
                if(cards[i].getSign() === enumCard.enumTypes.NUMBER){
                    return cards.splice(i, 1);
                }
            }
            return undefined;
        }
    };
})();
//stam

var stock = (function () {
    var cards = [];
    var twoCardsNumber = [1, 3, 4, 5, 6, 7, 8, 9];
    var colorNumber = [enumCard.enumColor.RED, enumCard.enumColor.BLUE,
        enumCard.enumColor.GREEN, enumCard.enumColor.YELLOW];
    var id = 0;
    var css;
    var htmlStock;

    function createDeck() {
        var stockImage =  document.createElement("img");
        htmlStock = document.createElement("div");

        htmlStock.appendChild(stockImage);
        stockImage.src = enumCard.images.MANY_CLOSE_CARDS;
        htmlStock.setAttribute("id", enumCard.dives.STOCK);
        document.getElementById(enumCard.dives.STOCK_AND_OPEN_CARDS).appendChild(htmlStock);
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
            css = getUniqueCss(Object.keys(enumCard.enumColor)[color], Object.keys(enumCard.enumTypes)[enumCard.enumTypes.TAKI],'_');
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.TAKI,
                takiValidation, takiOperation, id++));
            cards[cards.length-1].setElement(css);
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.TAKI,
                takiValidation, takiOperation, id++));
            cards[cards.length-1].setElement(css);

            css = getUniqueCss(Object.keys(enumCard.enumColor)[color], Object.keys(enumCard.enumTypes)[enumCard.enumTypes.STOP],'_');
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.STOP,
                stopValidation, stopOperation, id++));
            cards[cards.length-1].setElement(css);
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.STOP,
                stopValidation, stopOperation, id++));
            cards[cards.length-1].setElement(css);

            css = getUniqueCss(Object.keys(enumCard.enumColor)[color], Object.keys(enumCard.enumTypes)[enumCard.enumTypes.PLUS],'_');
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.PLUS,
                plusValidation, plusOperation, id++));
            cards[cards.length-1].setElement(css);
            cards.push(new Card(colorNumber[color], enumCard.enumTypes.PLUS,
                plusValidation, plusOperation, id++));
            cards[cards.length-1].setElement(css);

            css = getUniqueCss('', Object.keys(enumCard.enumTypes)[enumCard.enumTypes.CHANGE_COLOR],'');
            cards.push(new Card(undefined, enumCard.enumTypes.CHANGE_COLOR,
                changeColorValidation, changeColorOperation, id++));
            cards[cards.length-1].setElement(css);
        }

        var blue_change_color = document.createElement("img");
        var green_change_color = document.createElement("img");
        var red_change_color = document.createElement("img");
        var yellow_change_color = document.createElement("img");
        blue_change_color.src = "../Images/blue/blue_change_color.png";
        green_change_color.src = "../Images/green/green_change_color.png";
        red_change_color.src = "../Images/red/red_change_color.png";
        yellow_change_color.src = "../Images/yellow/yellow_change_color.png";
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffleDeck(shuffleCnt) {
        if(3*shuffleCnt > cards.length - 1)
            shuffleCnt = (cards.length - 1) / 3;
        for(var i = 0; i < 3*shuffleCnt; i++) {
            var rndNo = getRandomInt(0, cards.length - 1);
            var Card = cards[i];
            cards[i] = cards[rndNo];
            cards[rndNo] = Card;
        }
    }

    return{
        getCards: function(number) {
            return cards.splice(0, number);
        },

        setGame: function () {
            createDeck();
            shuffleDeck(getRandomInt(10, 25));
        },

        getValidOpenCard: function () {
            for(var i = 0; i < cards.length; ++i){
                if(cards[i].getSign() === enumCard.enumTypes.NUMBER){
                    return cards.splice(i, 1);
                }
            }
            return undefined;
        },

        makeStockAgain: function(allCards) {
            var css;
            for(var i = 0; i < allCards.length; ++ i){
                if(allCards[i].getSign() === enumCard.enumTypes.CHANGE_COLOR || allCards[i].getSign() === enumCard.enumTypes.SUPER_TAKI) {
                    allCards[i].setColor(undefined);
                    css = getUniqueCss("", Object.keys(enumCard.enumTypes)[allCards[i].getSign()], '');
                }
                else if(allCards[i].number === undefined)
                    css = getUniqueCss(Object.keys(enumCard.enumColor)[allCards[i].getColor()], Object.keys(enumCard.enumTypes)[allCards[i].getSign()],'_');
                else
                    css = getUniqueCss(Object.keys(enumCard.enumColor)[allCards[i].getColor()], allCards[i].number,'_');
                allCards[i].setElement(css);

                cards.push(allCards[i]);
            }
            shuffleDeck(getRandomInt(10, 25));//random number (the numbers not very important),amount of times to make shuffle
        },

        getLength: function () {
            return cards.length;
        },

        getAllCards: function () {
            return cards;
        },

        changeStockImage: function (){
            var stockHtml =  document.getElementById(enumCard.dives.STOCK);
            var stockImage =  document.createElement("img");
            while (stockHtml.firstChild) {
                stockHtml.removeChild(stockHtml.firstChild);
            }
            stockHtml.appendChild(stockImage);
            if(stock.getLength() > 30) {
                stockImage.src = enumCard.images.MANY_CLOSE_CARDS;
            }
            else if(stock.getLength() > 10) {
                stockImage.src = enumCard.images.FEW_CLOSE_CARDS;

            }
            else {
                stockImage.src = enumCard.images.CLOSE_CARD;
            }
        }
    };
})();

function Stock() {
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
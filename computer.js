function Computer() {
    var cards = [];

    function pickCard() {
        //need to pick card from my stock and put in stock
        game.dropValidation(); //why?
    }

    function checkSuitableCard(lastGameCardSign)
    {
        var isSuitable = false;
        var currentCard = undefined;

        for (var i=0; i < cards.length; ++i)
        {
            if(isSuitable === false)
            {
                if (cards[i].sign === lastGameCardSign && card[i].doValidation(gameCards.lastIndexOf(card)))
                {
                    isSuitable = true;
                    currentCard = cards[i];
                }
            }
        }
        if(isSuitable)
        {
            cards[i].doOperation();
            //put the card in gameCard, pull the card from hand, and change turn
        }

        return isSuitable;

    }

}
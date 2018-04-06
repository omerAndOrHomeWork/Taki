function Computer() {
    function pickCard() {
        card = this.super_.cards[2];
        game.dropValidation(); //why?
    }

    function checkSuitblaCard(lastGameCardsign)
    {
        var isSuitable = false;
        var currentCard = undefined;

        for (var i=0; i < cards.length; ++i)
        {
            if(isSuitable === false)
            {
                if (cards[i].sign === lastGameCardsign && card[i].doValidation(gameCards.lastIndexOf(card)))
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
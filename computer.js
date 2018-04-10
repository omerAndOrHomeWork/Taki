function Computer() {
    var cards = [];

    function pickCard() {
        //need to pick card from my stock and put in stock
        game.dropValidation(); //why?
    }

    function doTwoPlusInHand() {

    }

    function pickCardFromGiven(lastGameCard, changeColor, stop, plus, superTaki, taki, sameColor, sameSign) {
        if(sameSign instanceof TwoPlus)
            return sameSign;
        else if(changeColor !== null)
            return changeColor;
        else if(stop !== null)
            return stop;
        else if(sameSign instanceof Stop)
            return sameSign;
        else if(plus !== null)
            return plus;
        else if(sameSign instanceof Plus)
            return sameSign;
        else if(superTaki)
            return superTaki;
        else if(taki !== null)
            return taki;
        else if(sameSign instanceof Taki)
            return sameSign;
        else if(sameColor !== null)
            return sameColor;
        else if(sameSign !== null)
            return sameSign;
        else
            return null;
    }

    function doRegularHand(lastGameCard) {
        var changeColor = null, stop = null, plus = null,
            superTaki = null, taki = null, sameColor = null, sameSign = null;
        for(var i = 0; i < cards.length; ++i){
            if(cards[i].color === lastGameCard.color){
                if(cards[i] instanceof TwoPlus)
                    return cards[i];
                else if(cards[i] instanceof Stop)
                    stop = cards[i];
                else if(cards[i] instanceof Plus)
                    plus = cards[i];
                else if(cards[i] instanceof Taki)
                    taki = cards[i];
                else
                    sameColor = cards[i];
            }else if(cards[i] instanceof ChangeColorCard){
                changeColor = cards[i];
            }else if(cards[i] instanceof SuperTaki){
                superTaki = cards[i];
            }else if(cards[i] instanceof lastGameCard){
                sameSign = cards[i];
            }
        }
        return pickCardFromGiven(lastGameCard, changeColor, stop, plus,
            superTaki, taki, sameColor, sameSign);
    }

    function doOperation(lastGameCard){
        var promote;
        if(lastGameCard instanceof TwoPlus && lastGameCard.isActive())
            return doTwoPlusInHand();
        return doRegularHand(lastGameCard);
    }

    function checkSuitableCard(lastGameCardSign)
    {
        var isSuitable = false;
        var currentCard = undefined;

        for (var i=0; i < cards.length; ++i){
            if (!card.active && (card.color === this.color || card.sign === this.sign)) {
                isSuitable = true;
                currentCard = cards[i];
                break;
            }
        }

        this.getCards.pop(card);
        return isSuitable;

    }

}
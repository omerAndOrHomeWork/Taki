function Computer() {
    var cards = [];

    function pickCard() {
        //need to pick card from my stock and put in stock
        game.dropValidation(); //why?
    }

    function doTwoPlusInHand() {

    }

    function pickCardFromGiven(lastGameCard, changeColor, stop, plus, superTaki, taki, sameColor, sameSign) {
        if(sameSign.sign === "+2")
            return sameSign;
        else if(changeColor !== null)
            return changeColor;
        else if(stop !== null)
            return stop;
        else if(sameSign.sign === "stop")
            return sameSign;
        else if(plus !== null)
            return plus;
        else if(sameSign.sign === "plus")
            return sameSign;
        else if(superTaki)
            return superTaki;
        else if(taki !== null)
            return taki;
        else if(sameSign.sign === "taki")
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
                if(cards[i].sign === "+2")
                    return cards[i];
                else if(cards[i].sign === "stop")
                    stop = cards[i];
                else if(cards[i].sign === "plus")
                    plus = cards[i];
                else if(cards[i].sign === "taki")
                    taki = cards[i];
                else
                    sameColor = cards[i];
            }else if(cards[i].sign === "changeColor"){
                changeColor = cards[i];
            }else if(cards[i].sign === "superTaki"){
                superTaki = cards[i];
            }else if(cards[i].sign === lastGameCard.sign){
                sameSign = cards[i];
            }
        }
        return pickCardFromGiven(lastGameCard, changeColor, stop, plus,
            superTaki, taki, sameColor, sameSign);
    }

    function doOperation(lastGameCard){
        var promote;
        if(lastGameCard.sign == "+2" && lastGameCard.isActive())
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
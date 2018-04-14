var game = (function() {
    var stock = stock();
    var gameCards = [];
    var turn = 0;
    var players = [player(pullApproval, takiModeChecker, removeCard),
        smartComputer(pullApproval, takiModeChecker, removeCard)];
    var amountOfCardsToTakeFromStock = 1;
    var statistics = new Statistics();

    function changeTurn(promote) {
        players[turn].calculateAVG(); //TODO calculateAVG
        turn = (turn + promote) % players.length;
        players[turn].startClock(); //TODO startClock
    }

    function calcAmountCardsToTake(card){
        if(card.sign === Card.enumTypes.TWO_PLUS) {
            if (amountOfCardsToTakeFromStock % 2 === 0)
                amountOfCardsToTakeFromStock += 2;
            else
                amountOfCardsToTakeFromStock = 2;
        }else
            amountOfCardsToTakeFromStock = 1;
    }

    function Partition() {
        gameCards.push(stock.getCards(1));
        for(var i=0; i < players.length; ++i)
            players[i].setCards(stock.getCards(8));
    }

    /*function addEventListener() {
        document.getElementById("openCards").
    }*/

    function dropValidation(player, card) {
        if (player === players[turn]){
            if (card.doValidation(gameCards.lastIndexOf(Card))) {
                var promote = player.doOperation(card);
                gameCards.push(card);
                calcAmountCardsToTake(card);
                updateStatics();
                if(promote !== -1)
                    changeTurn(promote);
                computerOperation();
            }
            return true;
        }
        else
            return false;
    }


    function pullCardValidation(player) {
        if(player === players[turn] && player.pullApproval()){
            player.takiMode = null;
            player.pullCardFromStock(stock.getCards(amountOfCardsToTakeFromStock));
            gameCards.lastIndexOf(Card).makePassive();
            updateStatistics();
            changeTurn(1);
            computerOperation();
        }
    }

    function computerOperation(){
        if(players[turn] === Computer){
            var card = players[turn].pickCard(gameCards.lastIndexOf(card));
            if(card == null)
                pullCardValidation(players[turn]);
            else {
                dropValidation(players[turn], card);
            }
        }
    }

    // function setPlayerInPage(player) {
    //     var players = document.getElementById("players");
    //     players.children.
    //         ///players.Add(<li>player</li>);
    // }
    //
    // function makePlayers() {
    //     players.forEach((player) => {
    //         setPlayerInPage(player);
    //     });
    // }


})();
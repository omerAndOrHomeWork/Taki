function Game() {
    var stock = new Stock();
    var gameCards = [];
    var turn = 0;
    var players = [new Player(), new Player()];
    var amountOfCardsToTakeFromStock = 1;
    var statistics = new Statistics();

    function changeTurn(promote) {
        players[turn].calculateAVG(); //TODO calculateAVG
        turn = (turn + promote) % players.length;
        players[turn].startClock(); //TODO startClock
        if(players[turn] === Computer){
            var card = players[turn].do(gameCards.lastIndexOf(card));
            if(card == null)
                pullCardValidation(players[turn]);
            else {
                dropValidation(players[turn], card);
            }
        }
    }

    function calcAmountCardsToTake(card){
        if(card.sign === "+2") {
            if (amountOfCardsToTakeFromStock % 2 === 0)
                amountOfCardsToTakeFromStock += 2;
            else
                amountOfCardsToTakeFromStock = 2;
        }else
            amountOfCardsToTakeFromStock = 1;
    }

    function Partition() {
        gameCards.push(stock.getCard());
        for(var i=0; i < players.length; ++i)
            players[i].setCards(stock.getCards(8));
    }

    function dropValidation(player, card) {
        if (player === players[turn]){
            if (card.doValidation(gameCards.lastIndexOf(Card))) {
                var promote = player.doOperation(card);
                gameCards.push(card);
                calcAmountCardsToTake(card);
                updateStatics();
                changeTurn(promote);
            }
            return true;
        }
        else
            return false;
    }


    function pullCardValidation(player) {
        if(player === players[turn]){
            player.takiMode = null;
            var cards = stock.getCards(amountOfCardsToTakeFromStock);
            player.getCards.push(cards);
            gameCards.lastIndexOf(Card).makePassive();
            updateStatistics();
            changeTurn(1);
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
}
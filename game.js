function Game() {
    var stock = new Stock();
    var gameCards = [];
    var turn = 0;
    var players = [new Player(), new Player()];
    var amountOfCardsToTakeFromStock = 1;

    function changeTurn(promote) {
        players[turn].calculateAVG();
        turn = (turn + promote) % players.length;
        players[turn].startClock();
        if(players[turn] === Computer){
            var card = players[turn].do(gameCards.lastIndexOf(card));
            if(card == null)
                pullCardValidation(players[turn]);
            else
                dropValidation(players[turn], card);
        }
    }

    function Partition() {
        gameCards.push(stock.getCard());
        players.forEach(player => {
            player.setCards(stock.getCards());
        });
    }

    function dropValidation(player, card) {
        if (player === players[turn]){
            if (card.doValidation(gameCards.lastIndexOf(Card))) {
                var promote = player.doOperation(card);
                gameCards.push(card);
                updateStatics();
                changeTurn(promote);
            }
            return true;
        }
        else
            return false;
    }


    function pullCardValidation(player) {
        if(player == players[turn]){
            player.takiMode = false;
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
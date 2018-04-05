function Game() {
    var stock = new Stock();
    var gameCards = new Array();
    var turn = 0;
    var players = new Array(new Player(), new Player());

    function changeTurn(promote) {
        players[turn].calculateAVG();
        turn = (turn + promote) % players.length;
        players[turn].startClock();
        if(players[turn] === Computer)
            players[turn].do();
    }

    function Partition() {
        gameCards.push(stock.getCard());
        players.forEach(player => {
            player.setCards(stock.getCards());
        });
    }

    function dropValidation(player, card) {
        if(player == turn) {
            if (card.doValidation(gameCards.lastIndexOf(card))) {
                player.getCards.pop(card);
                var promote = card.doOperation();
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
        if(player == turn){
            var card = stock.getCard();
            player.getCards.push(card);
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
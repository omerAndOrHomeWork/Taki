var game = (function() {
    var gameCards = [];
    var turn = 0;
    var players = [player(), smartComputer()];
    var amountOfCardsToTakeFromStock = 1;
    var gameStatistics;
    var endGame = false;
    function changeTurn(promote) {
        players[turn].increasePlayerTurns();
        players[turn].calculateAVG();
        players[turn].resetPlayerClock();
        turn = (turn + promote) % players.length;
        gameStatistics.updateStatistics();
    }

    function calcAmountCardsToTake(card){
        if(card.getSign() === enumCard.enumTypes.TWO_PLUS) {
            if (amountOfCardsToTakeFromStock % 2 === 0)
                amountOfCardsToTakeFromStock += 2;
            else
                amountOfCardsToTakeFromStock = 2;
        }else
            amountOfCardsToTakeFromStock = 1;
    }

    function partition() {
        var gameStartCard = stock.getValidOpenCard();
        setCards(gameCards, gameStartCard);
        gameCards[0].setParent(enumCard.dives.OPEN_CARDS, false);
        for(var i=0; i < players.length; ++i)
            players[i].setCards(stock.getCards(8), players.length);
    }

    function colorPicked(pickedColor) {
        gameCards[gameCards.length - 1].setColor(pickedColor);
        gameCards[gameCards.length - 1].setImage(getUniqueCss(Object.keys(enumCard.enumColor)[pickedColor],
            Object.keys(enumCard.enumTypes)[enumCard.enumTypes.CHANGE_COLOR],'_'));
        document.getElementById(enumCard.dives.PICK_COLOR).style.visibility = "hidden";
        changeTurn(enumCard.enumResult.NEXT_TURN);
        setTimeout(computerOperation,2000);
    }

    function setEventsListener() {
        var drop = document.getElementById(enumCard.dives.OPEN_CARDS);
        drop.draggable = false;
        drop.ondragover = function (ev) {
            event.preventDefault();
        };

        drop.ondrop = function (event) {
            event.preventDefault();
            var pickColorId = document.getElementById(enumCard.dives.PICK_COLOR);
            if(pickColorId.style.visibility === "visible")
                return false;
            var id = event.dataTransfer.getData("Text");
            var card = players[turn].getCard(id);
            if (card !== undefined) {
                dropValidation(id, card);
            }
        };

        var click =  document.getElementById(enumCard.dives.STOCK);
        click.onclick = function(event) {//TODO: MAKE IT RESICD FOR CLICKING OUT OF TURN
            event.preventDefault();
            var pickColorId = document.getElementById(enumCard.dives.PICK_COLOR);
            if(pickColorId.style.visibility === "visible")
                return false;
            if(!players[turn].isComputer())
                pullCardValidation(players[turn]);
        };
        var restart = document.getElementById(enumCard.dives.RESTART_GAME);

        var blue = document.getElementById(enumCard.dives.BLUE_PICK);
        blue.onclick = function (ev) {
            ev.preventDefault();
            colorPicked(enumCard.enumColor.BLUE);
        };

        var green = document.getElementById(enumCard.dives.GREEN_PICK);
        green.onclick = function (ev) {
            ev.preventDefault();
            colorPicked(enumCard.enumColor.GREEN);
        };

        var red = document.getElementById(enumCard.dives.RED_PICK);
        red.onclick = function (ev) {
            ev.preventDefault();
            colorPicked(enumCard.enumColor.RED);
        };

        var yellow = document.getElementById(enumCard.dives.YELLOW_PICK);
        yellow.onclick = function (ev) {
            ev.preventDefault();
            colorPicked(enumCard.enumColor.YELLOW);
        };//work checked!
    }

    function endGameMode() {
        endGame = true;
        document.getElementById(enumCard.dives.PICK_COLOR).style.visibility = "hidden";
        document.getElementById(enumCard.dives.END_GAME_MODE).style.visibility = "visible";
        document.getElementById(enumCard.dives.STOCK_AND_OPEN_CARDS).style.visibility = "hidden";
        document.getElementById(enumCard.dives.MASSAGE).innerText = Object.keys(enumCard.enumPlayer)[turn] + " win!";
    }

    function dropValidation(id, card) {
        if (takiPermission(players[turn], card) && card.doValidation(gameCards[gameCards.length - 1])){
            var promote = players[turn].doOperation(card, gameCards[gameCards.length - 1]);
            document.getElementById(enumCard.dives.OPEN_CARDS).removeChild(gameCards[gameCards.length - 1].getElement());
            card.setParent(enumCard.dives.OPEN_CARDS, false);
            gameCards[gameCards.length - 1].setActive(false);
            card.changeImage(true);
            gameCards.push(card);
            calcAmountCardsToTake(card);
            // updateStatics();
            if(players[turn].getAmountOfCards() === 0 && card.getSign() !== enumCard.enumTypes.PLUS){
                endGameMode();
            }
            if(promote !== enumCard.enumResult.CONTINUE_TURN)
                changeTurn(promote);
            setTimeout(computerOperation,2000);
        }
    }

    function pullCardValidation(player) {
        if(player === players[turn] && player.pullApproval(gameCards[gameCards.length-1])){
            gameCards[gameCards.length - 1].setActive(false);
            player.setTakiMode(undefined);
            var cardsFromStock = stock.getCards(amountOfCardsToTakeFromStock);
            if(stock.getLength() <= amountOfCardsToTakeFromStock){
                var lastCard = gameCards.pop();
                removeAllCards(enumCard.dives.OPEN_CARDS);
                stock.makeStockAgain(gameCards);
                gameCards = undefined;
                gameCards = [];
                gameCards.push(lastCard);
                lastCard.setParent(enumCard.dives.OPEN_CARDS);
            }
                amountOfCardsToTakeFromStock = 1;
            player.pullCardFromStock(cardsFromStock);
           for(var i = 0; i < cardsFromStock.length; ++i)
               cardsFromStock[i].setParent(player.getHtmlDiv(), player.isDraggable());
            //TODO: take the cards from the stock. change the cssClass, cut the cards elements from the stock to the player cards element
            // gameCards.lastIndexOf(Card).makePassive(); why we need that?
            // updateStatistics();
            changeTurn(enumCard.enumResult.NEXT_TURN);
            setTimeout(computerOperation,2000);
        }
    }

    function computerOperation(){
        if(!endGame && players[turn].isComputer()){
            if(players[turn].colorToPick()) {
                var color = players[turn].getColor();
                colorPicked(color);
            }else {
                var card = players[turn].pickCard(gameCards[gameCards.length - 1]);
                if (card === undefined)
                    pullCardValidation(players[turn]);
                else {
                    dropValidation(players[turn], card);
                }
            }
        }
    }

    function removeHTMLElements(){
        removeAllCards(enumCard.dives.COMPUTER_CARDS);
        removeAllCards(enumCard.dives.PLAYER_CARDS);
        removeAllCards(enumCard.dives.OPEN_CARDS);
        removeAllCards(enumCard.dives.STATISTICS);
    }
    function resetDivsAttributes(){
        document.getElementById(enumCard.dives.END_GAME_MODE).style.visibility = "hidden";
        document.getElementById(enumCard.dives.STOCK_AND_OPEN_CARDS).style.visibility = "visible";
        document.getElementById(enumCard.dives.MASSAGE).innerText = '';
    }

    function getGameCards() {
        var allCards = [];
        takeCards(allCards, players[0].getAllCards());
        takeCards(allCards, players[1].getAllCards());
        takeCards(allCards, gameCards);
        return allCards;
    }

    function initialGameAndStatistics(){
        turn = 0;
        partition();
        gameStatistics = new statistics(players);
        gameStatistics.setStatistics();
        gameStatistics.updateStatistics();
        setEventsListener();
    }

    return{
        startGame: function () {
            document.getElementById("Enter_Game").style.visibility = "hidden";
            stock.setGame();
            initialGameAndStatistics();
            setTimeout(computerOperation,2000);
        },

        restartGame: function(){
            event.preventDefault();
            endGame = false;
            removeHTMLElements();
            resetDivsAttributes();
            var allCards = [];
            allCards = getGameCards();
            players[0] = undefined;
            players[1] = undefined;
            gameCards = undefined;
            players = undefined;
            gameCards = [];
            stock.makeStockAgain(allCards);
            players = [player(), smartComputer()];
            gameStatistics = undefined;
            initialGameAndStatistics();
            setTimeout(computerOperation,2000);
        },

    }


})();
//stam
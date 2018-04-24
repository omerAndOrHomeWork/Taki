var game = (function() {
    var gameCards = [];
    var turn = 0;
    var cssID=0;
    var players = [player(), smartComputer()];
    var amountOfCardsToTakeFromStock = 1;
    var gameStatistics;

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

    function colorPicked(event, pickedColor) {
        event.preventDefault();
        gameCards[gameCards.length - 1].setColor(pickedColor);
        gameCards[gameCards.length - 1].setImage(getUniqueCss(Object.keys(enumCard.enumColor)[pickedColor],
            Object.keys(enumCard.enumTypes)[enumCard.enumTypes.CHANGE_COLOR],'_'));
        document.getElementById("pickColor").style.visibility = "hidden";
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
            pullCardValidation(players[turn]);
        };


        var blue = document.getElementById(enumCard.dives.BLUE_PICK);
        blue.onclick = function (ev) {
            colorPicked(ev, enumCard.enumColor.BLUE);
        };

        var green = document.getElementById(enumCard.dives.GREEN_PICK);
        green.onclick = function (ev) {
            colorPicked(ev, enumCard.enumColor.GREEN);
        };

        var red = document.getElementById(enumCard.dives.RED_PICK);
        red.onclick = function (ev) {
            colorPicked(ev, enumCard.enumColor.RED);
        };

        var yellow = document.getElementById(enumCard.dives.YELLOW_PICK);
        yellow.onclick = function (ev) {
            colorPicked(ev, enumCard.enumColor.YELLOW);
        };//work checked!
    }

    function dropValidation(id, card) {
        if (card.doValidation(gameCards[gameCards.length - 1])){
            var promote = players[turn].doOperation(card, gameCards[gameCards.length - 1]);
            document.getElementById(enumCard.dives.OPEN_CARDS).removeChild(gameCards[gameCards.length - 1].getElement());
            card.setParent(enumCard.dives.OPEN_CARDS, false);
            gameCards[gameCards.length - 1].setActive(false);
            gameCards.push(card);
            calcAmountCardsToTake(card);
            // updateStatics();
            if(promote !== enumCard.enumResult.EXTRA_TURN &&
                promote !== enumCard.enumResult.CONTINUE_TURN)
                changeTurn(promote);
            setTimeout(computerOperation,2000);
        }
    }


    function pullCardValidation(player) {
        if(player === players[turn] && player.pullApproval(gameCards[gameCards.length-1])){
            gameCards[gameCards.length - 1].setActive(false);
            player.setTakiMode(undefined);
            var cardsFromStock = stock.getCards(amountOfCardsToTakeFromStock);
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
        if(players[turn].isComputer()){

            var card = players[turn].pickCard(gameCards[gameCards.length - 1]);
            if(card === undefined)
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

    return{
        startGame: function () {
            stock.setGame();
            partition();
            gameStatistics = new statistics(players);
            gameStatistics.setStatistics();
            gameStatistics.updateStatistics();
            setEventsListener();
            setTimeout(computerOperation,2000);
        }
    }


})();
//stam
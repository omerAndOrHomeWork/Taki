var game = (function() {
    var gameCards = [];
    var turn = 0;
    var cssID=0;
    var players = [player(), smartComputer()];
    var amountOfCardsToTakeFromStock = 1;
    var gameStatistics;

    function changeTurn(promote) {
        //players[turn].calculateAVG();
        turn = (turn + promote) % players.length;
        //players[turn].startClock();
        //setInterval(players[turn].calcCurrentTurn(),1000);
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

    function setEventListener() {
        var drop = document.getElementById(enumCard.dives.OPEN_CARDS);
        drop.draggable = false;
        drop.ondragover = function (ev) {
            event.preventDefault();
        };
        drop.ondrop = function (event) {
            event.preventDefault();
        };
        drop.ondrop = function (event) {
            event.preventDefault();
            var id = event.dataTransfer.getData("Text");
            var card = players[turn].getCard(id);
            if (card !== undefined) {
                dropValidation(id, card);
            }
        };
    }

    function addEventListener() {
        var click =  document.getElementById(enumCard.dives.STOCK);
        click.onclick = function(event) {
            event.preventDefault();
            pullCardValidation(players[turn]);
        };
    }

    /* Events fired on the drop target */
    /*drop.ondragover = function(event) {
        event.preventDefault();
        document.getElementById("demo").innerHTML = "The p element is OVER the droptarget.";
        event.target.style.border = "4px dotted purple";
    };

    drop.ondrop = function(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("Text");
        var text = data.writeSomthing();
        event.target.appendChild(document.getElementById(text));
        document.getElementById("demo").innerHTML = "The p element was dropped.";
    };*/

    function dropValidation(id, card) {
        if (card.doValidation(gameCards[gameCards.length - 1])){
            var promote = players[turn].doOperation(card, gameCards[gameCards.length - 1]);
            document.getElementById(enumCard.dives.OPEN_CARDS).removeChild(gameCards[gameCards.length - 1].getElement());
            card.setParent(enumCard.dives.OPEN_CARDS, false);
            gameCards.push(card);
            calcAmountCardsToTake(card);
            // updateStatics();
            if(promote !== -1)
                changeTurn(promote);
            computerOperation();
        }
    }


    function pullCardValidation(player) {
        if(player === players[turn] && player.pullApproval(gameCards[gameCards.length-1])){
            player.takiMode = undefined;
            var cardsFromStock = stock.getCards(amountOfCardsToTakeFromStock);
            player.pullCardFromStock(cardsFromStock);
           for(var i = 0; i<amountOfCardsToTakeFromStock; ++i)
               cardsFromStock[i].setParent(player.getHtmlDiv(), player.isDraggable());
            //TODO: take the cards from the stock. change the cssClass, cut the cards elements from the stock to the player cards element
            // gameCards.lastIndexOf(Card).makePassive(); why we need that?
            // updateStatistics();
            changeTurn(1);
            computerOperation();
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
            gameStatistics = new statistics(players.length);
            setEventListener();
            addEventListener();
            changeTurn(0);
            computerOperation();
        }
    }


})();
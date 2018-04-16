var game = (function() {
    var stock = stock();
    var gameCards = [];
    var turn = 0;
    var players = [player(pullApproval, takiModeChecker, removeCard, searchCard),
        smartComputer(pullApproval, takiModeChecker, removeCard, searchCard)];
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

    function addEventListener() {
        var drop = document.getElementById("openCards");
        drop.ondrop = function (event) {
            event.preventDefault();
            var id = event.dataTransfer.getData("Text");
            var card = players[turn].getCard(id);
            if (card !== null) {
                dropValidation(players[turn], card, drop);
            }
            // var text = data.writeSomthing();
            // event.target.appendChild(document.getElementById(text));
            // document.getElementById("demo").innerHTML = "The p element was dropped.";
        };
    }

    function addEventListener() {
        var click =  document.getElementById("stock");
        drop.onclick = function(event) {
            event.preventDefault();
            var id = event.dataTransfer.getData("Text");
            var card = players[turn].getCard(id);
            if(card !== null) {
                dropValidation(players[turn], card, drop);
            }
            // var text = data.writeSomthing();
            // event.target.appendChild(document.getElementById(text));
            // document.getElementById("demo").innerHTML = "The p element was dropped.";
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

    function dropValidation(player, card, drop) {
        //if (player === players[turn]){
            if (card.doValidation(gameCards.lastIndexOf(card))) {
                var promote = player.doOperation(card);
                drop.appendChild(card.getHtmlElement());
                gameCards.push(card);
                calcAmountCardsToTake(card);
                updateStatics();
                if(promote !== -1)
                    changeTurn(promote);
                computerOperation();
            }
       /*
            return true;
        }
        else
            return false;
            */
    }


    function pullCardValidation(player) {
        if(player === players[turn] && player.pullApproval()){
            player.takiMode = null;
            player.pullCardFromStock(stock.getCards(amountOfCardsToTakeFromStock));
            //TODO: take the cards from the stock. change the cssClass, cut the cards elements from the stock to the player cards element
            gameCards.lastIndexOf(Card).makePassive();
            updateStatistics();
            changeTurn(1);
            computerOperation();

            card.changeCss(player.getCss());
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
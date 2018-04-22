var statistics = function(i_playersGame) {
    var turnsCounter = 0;
    this.playersGame = i_playersGame;
    var singleCardPlayers = []; // if that correct
   // var htmlStatistics = document.getElementsByClassName(enumCard.dives.STATISTICS);
    var gameClock = new clock();
    gameClock.run(); // the clock update in intervals

    function showPlayerStatistics(playerKind){
        for(var i = 0; i < playersGame.length; ++i) {
            console.log(object.keys(enumColor)[playerKind] + ":" + "<br />");
            console.log("Amount of turn played: " + playersGame[playerKind].getTurnsPlayed() + "<br />");
            console.log("Amount of times single card in game: " + playersGame[playerKind].getSingleCardCounter() + "<br /> + \"<br />");
        }
    }

    return{
        updateStatistics: function (player,playerKind) {
            turnsCounter++;
            singleCardPlayers[playerKind] = player.getSingleCardCounter();
            console.log("Amount of turn played total :" + turnsCounter + "<br />");
            showPlayerStatistics(playerKind);
        }
    };
}

//TODO: GetAVG in loop
//TODO: GetSingleCardsInLoop

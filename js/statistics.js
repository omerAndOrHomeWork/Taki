var statistics = function(thePlayersGame) {
    var turnsCounter = -1;
    var playersGame = thePlayersGame;
    var singleCardPlayers = [];
    var htmlDivsPlayers = new Array(playersGame.length);
    var gameClock = new clock();
    gameClock.run();
    return{
        setStatistics:function(){
            for(var i = 0; i <htmlDivsPlayers.length;++i){
                htmlDivsPlayers[i] = document.createElement("div");
                htmlDivsPlayers[i].setAttribute("id",Object.keys(enumCard.enumPlayer)[i]);
                document.getElementById(enumCard.dives.STATISTICS).appendChild(htmlDivsPlayers[i]);
            }
        },

        updateStatistics: function () {
            turnsCounter++;
            for(var i = 0; i < playersGame.length; ++i) {
                singleCardPlayers[i] = playersGame[i].getSingleCardCounter();
                var playerLocal = Object.keys(enumCard.enumPlayer)[i] + ":\n";
                playerLocal += "Turns played: " + playersGame[i].getTurnsPlayed() + "\n";
                playerLocal += "Single cards times: " + playersGame[i].getSingleCardCounter() + "\n\n";
                playerLocal += "Average turn time: " + playersGame[i].getAverageTimePlayed() + "\n\n";
                htmlDivsPlayers[i].innerText = playerLocal;
            }
            htmlDivsPlayers[htmlDivsPlayers.length - 1].innerHTML += "Turns played totally :" + turnsCounter + "<br />";
        }
    };
};
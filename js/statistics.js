var statistics = function(thePlayersGame) {
    var turnsCounter = -1;
    var playersGame = thePlayersGame;
    var singleCardPlayers = [];
    var htmlDivsPlayers = new Array(playersGame.length);
    var gameClock = new clock();
    gameClock.run();
    return{
        initialStatisticsTitle: function(){
            var gameName = document.createElement("h3");
            gameName.innerText = "Game Statistics:";
            document.getElementById("sidebar").insertBefore(gameName,document.getElementById(enumCard.dives.STATISTICS));
        },

        setStatistics:function(){

            for(var i = 0; i <htmlDivsPlayers.length;++i){
                htmlDivsPlayers[i] = document.createElement("div");
                htmlDivsPlayers[i].setAttribute("id",Object.keys(enumCard.enumPlayer)[i]);
                document.getElementById(enumCard.dives.STATISTICS).appendChild(htmlDivsPlayers[i]);
            }
        },

        updateStatistics: function () {
            turnsCounter++;
            htmlDivsPlayers[0].innerHTML = "\n" + "Turns played totally :" + turnsCounter;
            for(var i = 0; i < playersGame.length; ++i) {
                singleCardPlayers[i] = playersGame[i].getSingleCardCounter();
                var playerLocal = "\n\n" + Object.keys(enumCard.enumPlayer)[i] + ":\n";
                playerLocal += "Turns played: " + playersGame[i].getTurnsPlayed() + "\n";
                playerLocal += "Single cards times: " + playersGame[i].getSingleCardCounter() + "\n";
                playerLocal += "Average turn time: " + Math.round(playersGame[i].getAverageTimePlayed()*100)/100 + " sec";
                htmlDivsPlayers[i].innerText += playerLocal;
            }
        }
    };
};
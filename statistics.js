function Statistics() {
    var turnsCounter;
    var timeFromStartGame;
    //TODO: take care gameTime

    return{
        updateStasics: function (players) {
            turnsCounter++;
            //TODO: GetAVG in loop
            //TODO: GetSingleCardsInLoop
            for(var i = 0; i < players.length; ++i){
                players[i].singleCard
            }
        }
    };
}
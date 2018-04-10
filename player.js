function Player() {
    var cards = [];
    var avrageTimePlayed;
    var turnsPlayed = 0;
    var singleCardCounter = 0;
    var takiMode;
    var currentTurnTime;

    //optional that player can drag his cards only in his turn
    // will get also "players","turn"
    //and will check in addition this === players[turn]
    function dragValidation(card) {
        if(cards.contains(card))
            return true;
        return false;
    }

    /*function setCards(playerHtml) {

        //playerHtml.add(<li>card</li>)
        ///players.Add(<li>player</li>);
    }*/

    function checkMoreFromTakiColor () {
        var promote;
        var foundColor = false;
        for(var i = 0; i < cards.length; ++i){
            if(cards[i].color === takiMode.color){
                promote = 0;
                foundColor = true;
                break;
            }
        }
        if(!foundColor) {
            takiMode = null;
            promote = 1;
        }
        return promote;
    }

    /*
    function timer(){
        setTimeout(function() {
            time++;
            /*
                        var hours = Math.floor(time/60/60/60);
                        var minutes = Math.floor(time/60/60);
                        var seceonds = Math.floor(time/60);

                        if(min < 10) {
                            min = "0" + min;
                        }

                        if(sec < 10) {
                            sec = "0" + sec;
                        }

                        if(sec >= 60) {
                            sec = sec % 60;
                        }

                        if(hours === 23 && minutes === 59 && seconds === 59) {
                            hours = 0;
                            minutes = 0;
                            seceonds = 0;

        }
        }, 10

            );
*/
    return{
        calculateAVG: function(currentTurnTime){
            avrageTimePlayed *= turnsPlayed;
            avrageTimePlayed += currentTurnTime;
            turnsPlayed++;
            avrageTimePlayed /= turnsPlayed;
        },

        startClock: function () {
            currentTurnTime = 0;
            var minutes=0;
            var seconds=0;
            var hours = 0;
            document.d.d2.value='0';

            function display(){
                if (seconds>=59){
                    seconds=0;
                    minutes+=1;
                }
                else
                    seconds+=1;
                document.d.d2.value=minutes+"."+seconds;
                setTimeout("display()",1000);
            }
        },

        clacCureentTruen: function() {
            currentTurnTime += 1;
        },

        setCards: function (cards) {
            this.cards = cards;
        },

        doOperation: function (card) {
            this.getCards.pop(card);
            var promote = card.doOperation();
            if(promote === -1)
                player.takiMode = card;
            if(player.takiMode !== null)
                promote = checkMoreFromTakiColor();
            if(cards.length === 1)
                singleCardCounter++;
            return promote;
        }

    };
}


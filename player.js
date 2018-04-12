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


    return{
        calculateAVG: function(currentTurnTime){
            avrageTimePlayed *= turnsPlayed;
            avrageTimePlayed += currentTurnTime;
            turnsPlayed++;
            avrageTimePlayed /= turnsPlayed;
        },

        startClock: function () {
            currentTurnTime = 0;
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

    /*
    class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = [ 0, 0, 0 ];
    }

    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }

    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }

    clear() {
        clearChildren(this.results);
    }

    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }

    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 1000;
        // Seconds are 100 hundredths of a second
        if (this.times[2] == 60) {
            this.times[1] += 1;
            this.times[2] = 0;
        }
        // Minutes are 60 seconds
        if (this.times[1] == 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }

    print() {
    	this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results'));
     */
}


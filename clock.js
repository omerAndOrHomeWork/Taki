var clock = function() {
    var cur_date = new Date(0,0);
    var hours = cur_date.getHours();
    var minutes = cur_date.getMinutes();
    var seconds = cur_date.getSeconds();
    var clockHtml = document.createElement("div");
    clockHtml.setAttribute("id",enumCard.dives.CLOCK);
    document.getElementById(enumCard.dives.STATISTICS).appendChild(clockHtml);

    return {
        run: function () {
            setInterval(this.update.bind(this), 1000);
        },

        update: function () {
            clockHtml.innerHTML = "Game clock: " + hours + ":" + minutes + ":" + seconds;
            this.updateTime(1);
        },

        updateTime: function (secs) {
            seconds += secs;
            if (seconds >= 60) {
                minutes++;
                seconds = 0;
            }

            if (minutes >= 60) {
                hours++;
                minutes = 0;
            }
            if (hours >= 24) {
                hours = 0;
            }
        }
    }
};
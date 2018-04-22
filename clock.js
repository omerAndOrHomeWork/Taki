/*
<!DOCTYPE html>
<html>
<body>

<div class="clock"></div>

    <script>
*/
var clock = function() {
        var cur_date = new Date(0,0);
        var hours = cur_date.getHours();
        var minutes = cur_date.getMinutes();
        var seconds = cur_date.getSeconds();

return {
    run: function()
    {
        setInterval(this.update.bind(this), 1000);
    },

    update: function() {
        var clockHtmlFormat = "Game clock: " + hours + ":" + minutes + ":" + seconds;
        document.getElementById(enumCard.dives.CLOCK).innerHTML = clockHtmlFormat;
        this.updateTime(1);

    },
    updateTime : function (secs) {
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
/*
</script>

</body>
</html> 
*/
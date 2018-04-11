/*
<!DOCTYPE html>
<html>
<body>

<div class="clock"></div>

    <script>
*/
function clock(display)
    {
        this.cur_date = new Date(0,0);
        this.hours = this.cur_date.getHours();
        this.minutes = this.cur_date.getMinutes();
        this.seconds = this.cur_date.getSeconds();
        this.display = display;
    }
clock.prototype.run = function ()
{
    setInterval(this.update.bind(this), 1000);
};
clock.prototype.update = function ()
{
    this.updateTime(1);
    this.display.innerText = (this.hours + ":" + this.minutes + ":" + this.seconds);
};
clock.prototype.updateTime = function (secs)
{
    this.seconds+= secs;
    if (this.seconds >= 60)
    {
        this.minutes++;
        this.seconds= 0;
    }
    if (this.minutes >= 60)
    {
        this.hours++;
        this.minutes=0;
    }
    if (this.hours >= 24)
    {
        this.hours = 0;
    }
};
var gameClock = new clock(
    document.querySelector('.clock'));
clock.run();
/*
</script>

</body>
</html> 
*/
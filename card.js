var card = function(color, sign, validation, operation, theId) {
    this.color = color;
    this.sign = sign;
    this.validation = validation;
    this.operate = operation;
    this.active = false;
    var id = theId;
    var htmlCard;
    var placeHolder;

    function addEvents(player, placeHolderName) {
        placeHolder  =  document.getElementById(placeHolderName);
        htmlCard = document.createElement("span");
        htmlCard.className += sign;
        htmlCard.className += color;
        placeHolder.appendChild(htmlCard);

        htmlCard.ondragstart = function (event) {
            if(player.dragValidation(this)) {
                htmlCard.draggable = true;
                event.dataTransfer.setData("Text", id);
            }
            else
                htmlCard.draggable = false;
        };
        /*
        span.addEventListener("ondragstart", function(){
            if(player.dragValidation(this))
                span.draggable = true;
        });
        */
      /*  span.ondragstart = function (ev) {
            if(player.dragValidation(this))
                span.draggable = true;
        }*/


        /*drag.ondragstart = function(event) {
            event.dataTransfer.setData("Text", event.target.id);
        };

        drag.ondrag = function(event) {
            document.getElementById("demo").innerHTML = "The p element is being dragged.";
        };*/
        // span.addEventListener("ondragover", function(){
        //     span.draggable = false;
        // });
    }


/*var ul = document.getElementById("list");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode("Element 4"));
* */
    return{

        doValidation: function(){
            validation();
        },

        doOperation: function(){
            operation();
        },

        makePassive: function () {
            this.active = false;
        },

        isActive: function (){
            return this.active;
        },

        getId: function () {
            return id;
        },

        getHtmlElement: function () {
            document.getElementById("cards").removeChild(htmlCard);
            return htmlCard;
        }
    }
};

/*
function Card() {
    return{
        enumColor: Object.freeze({RED:0,BLUE:1, GREEN:2, YELLOW:3}),

        enumTypes: Object.freeze({STOP:0, CHANGE_COLOR:1, PLUS:2, NUMBER:3, TAKI:4,
            SUPER_TAKI:5, TWO_PLUS:6})
    }
}
*/

/*function Card(color, sign, validation, operation, active) {
    this.color = color;
    this.sign = sign;
    this.validation = validation;
    this.operate = operation;
    this.active = active;

    /!*
    * dragvalidation
    * dropvalidation
    * operation
    *    validation
    *
    * *!/

/!*
    var setColor = function (color)
    {
        this.color = color;
    }

    var setSign = function (sign)
    {
        this.sign = sign;
    }
*!/

    return{
        enumColor: Object.freeze({RED:0,BLUE:1, GREEN:2, YELLOW:3}),

        enumTypes: Object.freeze({STOP:0, CHANGE_COLOR:1, PLUS:2, NUMBER:3, TAKI:4,
            SUPER_TAKI:5, TWO_PLUS:6}),

        doValidation: validation,

        doOperation: operation,

        makePassive: function () {
            active = false;
        },

        isActive: this.active
    }
}*/

/*function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
};*/


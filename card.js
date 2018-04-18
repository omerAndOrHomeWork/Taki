var card = function(theColor, theSign, validation, operation, theId) {
    this.color = theColor;
    this.sign = theSign;
    this.validation = validation;
    this.operate = operation;
    this.active = false;
    var id = theId;
    var htmlCard;
    var uniqueCard;



    function setCssClasses(){

    }



    function setEvents(player){
        //placeHolder = document.getElementById(placeHolderName);
        //htmlCard = document.createElement("span");
        //htmlCard.className += sign;
        //htmlCard.className += color;
        //htmlCard.className += open;



        //



        //placeHolder.appendChild(htmlCard);


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

    function setHtmlElement(){
        htmlCard = document.createElement("div");
        htmlCard.setAttribute("id", id);
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

        /*getHtmlElement: function () {
            document.getElementById("cards").removeChild(htmlCard);
            return htmlCard;
        },*/
        /*setHtmlParent: function(newParent) {
            newParent.appendChild(card.getElement);
        }*/

        setParent: function (parentHolder) {
            document.getElementById(parentHolder).appendChild(htmlCard);
            //htmlCard.ondragstart = null;
        },

        setHtmlEvent: function(player) {
            htmlCard.ondragstart = function (event) {
                if(player.dragValidation(this)) {
                    htmlCard.draggable = true;
                    event.dataTransfer.setData("Text", id);
                }
                else
                    htmlCard.draggable = false;
            };
        },

        setCss: function (theUniqueCard) {//red3
            uniqueCard = theUniqueCard;
            setHtmlElement();
            htmlCard.className += theUniqueCard;
            //htmlCard.className += "closeCardCss";
        },

        changeCss: function (closeCard){
          if(closeCard) {
              htmlCard.className += "closeCardCss";
              htmlCard.className -= uniqueCard;

          }else{
              htmlCard.className -= "closeCardCss";
              htmlCard.className += uniqueCard;
          }
        },

        getSign: function(){
            return this.sign;
        },
        getColor: function () {
            return this.color;
        }
    }
};
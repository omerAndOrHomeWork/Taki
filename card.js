var card = function(theColor, theSign, validation, operation, theId) {
    var color = theColor;
    var sign = theSign;
    this.validation = validation;
    this.operate = operation;
    var active = false;
    var id = theId;
    var htmlCard;
    var uniqueCard;

    function setHtmlElement(){
        htmlCard = document.createElement("div");
        htmlCard.setAttribute("id", id);
    }

    return{

        doValidation: function(lastCard){
            validation(lastCard,this);
        },

        doOperation: function(){
            operation();
        },

        makePassive: function () {
            active = false;
        },

        isActive: function (){
            return active;
        },

        getId: function () {
            return id;
        },

        setParent: function (parentHolder) {
            document.getElementById(parentHolder).appendChild(htmlCard);
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

        setCss: function (theUniqueCard,htmlStockID) {
            uniqueCard = theUniqueCard;
            setHtmlElement();
            //element.classList.add("mystyle");
            htmlCard.classList.add(enumCard.cssStyle.CLOSE_CARD);
            document.getElementById(htmlStockID).appendChild(htmlCard);
        },

        changeCss: function (openCard){
          if(openCard) {
              htmlCard.classList.remove(enumCard.cssStyle.CLOSE_CARD);
              htmlCard.classList.add(uniqueCard);
          }else{
              htmlCard.classList.add(enumCard.cssStyle.CLOSE_CARD);
              htmlCard.classList.remove(uniqueCard);
          }
        },

        getSign: function(){
            return sign;
        },
        getColor: function () {
            return color;
        }
    }
};
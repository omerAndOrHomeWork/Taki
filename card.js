var card = function(theColor, theSign, theValidation, theOperation, theId) {
    var color = theColor;
    var sign = theSign;
    var validation = theValidation;
    var operation = theOperation;
    var active = false;
    var id = theId;
    var htmlCard;
    var uniqueCardImage;
    var closeCardImage;

    function setHtmlElement(imgName) {
        htmlCard = document.createElement("a");
        htmlCard.setAttribute("id", id);
        closeCardImage =  document.createElement("img");
        closeCardImage.src = enumCard.images.CLOSE_CARD;
        uniqueCardImage = document.createElement("img");
        var colorName;
        if( color !== undefined)
            colorName = Object.keys(enumCard.enumColor)[color].toLowerCase();
        else
            colorName = "other";
        uniqueCardImage.src = "../Taki/Images/" + colorName + "/" + imgName.toLowerCase() + ".png";
        // htmlCard.appendChild(img);
    }


    function setHtmlEvent(dragable) {
        htmlCard.ondragstart = function (event) {
            if(!dragable)
                return false;
            htmlCard.draggable = true;
            event.dataTransfer.setData("Text", id);
        };
    }

    return{

        doValidation: function(lastCard){
            return validation(this, lastCard);
        },

        doOperation: function(){
            return operation();
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

        setParent: function (parentHolder, dragable) {
            document.getElementById(parentHolder).appendChild(htmlCard);
            setHtmlEvent(dragable);
        },


        setElement: function (theUniqueCard) {
            //uniqueCardImage = theUniqueCard;
            setHtmlElement(theUniqueCard);
            // htmlCard.classList.add(enumCard.cssStyle.CLOSE_CARD);
            setHtmlEvent(false);
            // htmlCard.appendChild(closeCardImage);
            document.getElementById(enumCard.dives.STOCK).appendChild(htmlCard);
        },

        changeCss: function (openCard){
          if(openCard) {
              // htmlCard.classList.remove(enumCard.cssStyle.CLOSE_CARD);
              // htmlCard.classList.add(enumCard.cssStyle.OPEN_CARD);
              // htmlCard.removeChild(closeCardImage);
              htmlCard.appendChild(uniqueCardImage);
          }else{
              // htmlCard.classList.add(enumCard.cssStyle.CLOSE_CARD);
              // htmlCard.classList.remove(enumCard.cssStyle.OPEN_CARD);
              htmlCard.removeChild(uniqueCardImage);
              // htmlCard.appendChild(closeCardImage);
          }
        },

        getSign: function(){
            return sign;
        },
        getColor: function () {
            return color;
        },

        getElement: function () {
            return htmlCard;
        }

    }
};
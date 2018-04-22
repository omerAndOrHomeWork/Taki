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


    function setUniqueImage(imgName) {
        var colorName;
        if( color !== undefined)
            colorName = Object.keys(enumCard.enumColor)[color].toLowerCase();
        else
            colorName = "other";
        uniqueCardImage.src = "../Taki/Images/" + colorName + "/" + imgName.toLowerCase() + ".png";

    }

    function setHtmlElement(imgName) {
        htmlCard = document.createElement("a");
        htmlCard.setAttribute("id", id);
        closeCardImage =  document.createElement("img");
        closeCardImage.src = enumCard.images.CLOSE_CARD;
        uniqueCardImage = document.createElement("img");
                // htmlCard.appendChild(img);
        setUniqueImage(imgName);
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
            return validation(lastCard, this);
        },

        doOperation: function(player, lastCard){
            return operation(player, this, lastCard);
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

        changeImage: function (openCard){
            while (htmlCard.firstChild) {
                htmlCard.removeChild(htmlCard.firstChild);
            }
            if(openCard)
                htmlCard.appendChild(uniqueCardImage);
            else
                htmlCard.appendChild(closeCardImage);
            /*if(openCard) {

                // htmlCard.classList.remove(enumCard.cssStyle.CLOSE_CARD);
                // htmlCard.classList.add(enumCard.cssStyle.OPEN_CARD);
                // htmlCard.removeChild(closeCardImage);
                htmlCard.appendChild(uniqueCardImage);
            }else{
                htmlCard.appendChild(closeCardImage);
                // htmlCard.classList.add(enumCard.cssStyle.CLOSE_CARD);
                // htmlCard.classList.remove(enumCard.cssStyle.OPEN_CARD);
                // htmlCard.appendChild(closeCardImage);
            }*/
        },

        getSign: function(){
            return sign;
        },
        getColor: function () {
            return color;
        },

        getElement: function () {
            return htmlCard;
        },

        setColor: function (theColor) {
          color = theColor;
        },

        setImage: function (imgName) {
            setUniqueImage(imgName);
        }

    }
};
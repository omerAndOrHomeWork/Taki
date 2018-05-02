function Card(theColor, theSign, theValidation, theOperation, theId) {
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
        uniqueCardImage.setAttribute("src", "../Taki/Images/" + colorName + "/" + imgName.toLowerCase() + ".png");

    }

    function setHtmlElement(imgName) {
        htmlCard = document.createElement("a");
        htmlCard.setAttribute("id", id);
        closeCardImage =  document.createElement("img");
        closeCardImage.src = enumCard.images.CLOSE_CARD;
        uniqueCardImage = document.createElement("img");
        setUniqueImage(imgName);
    }

    function setHtmlEvent(draggable) {
        htmlCard.ondragstart = function (event) {
            var pickColorId = document.getElementById(enumCard.dives.PICK_COLOR);
            if(!draggable || pickColorId.style.visibility === "visible")
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

        isActive: function (){
            return active;
        },

        getId: function () {
            return id;
        },

        setParent: function (parentHolder, draggable) {
            document.getElementById(parentHolder).appendChild(htmlCard);
            setHtmlEvent(draggable);
        },

        setElement: function (theUniqueCard) {
            setHtmlElement(theUniqueCard);
            setHtmlEvent(false);
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
        },

        setActive: function (activeness) {
            active = activeness;
        }
    }
}
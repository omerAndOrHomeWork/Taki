var card = function(color, sign, validation, operation) {
    this.color = color;
    this.sign = sign;
    this.validation = validation;
    this.operate = operation;
    this.active = false;

    return{
        enumColor: Object.freeze({RED:0,BLUE:1, GREEN:2, YELLOW:3}),

        enumTypes: Object.freeze({STOP:0, CHANGE_COLOR:1, PLUS:2, NUMBER:3, TAKI:4,
            SUPER_TAKI:5, TWO_PLUS:6}),

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


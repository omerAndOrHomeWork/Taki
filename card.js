function Card(color, sign, validation, operation, active) {
    this.color = color;
    this.sign = sign;
    this.validation = validation;
    this.operate = operation;
    this.active = active;

    /*
    * dragvalidation
    * dropvalidation
    * operation
    *    validation
    *
    * */

/*
    var setColor = function (color)
    {
        this.color = color;
    }

    var setSign = function (sign)
    {
        this.sign = sign;
    }
*/

    return{
        doValidation: validation,
        doOperation: operation,
        makePassive: function () {
            active = false;
        }
    }
}

function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
};


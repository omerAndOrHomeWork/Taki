function Card(color, sign,validation, operation) {
    this.color = color;
    this.sign = sign;
    this.validation = validation;
    this.operate = operation;
    /*
    * dragvalidation
    * dropvalidation
    * operation
    *    validation
    *
    * */

    var setColor = function (color)
    {
        this.color = color;
    }

    var setSign = function (sign)
    {
        this.sign = sign;
    }

    return{
        doValidation: validation,


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


function Card(color, sign,validation, operation) {
    this.color = undefined;
    this.sign = undefined;
    this.validation = validation;
    this.operate = operation;
    /*
    * dragvalidation
    * dropvalidation
    * operation
    *    validation
    *
    * */
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


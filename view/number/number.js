var Polynom = require('polynom/polynom.js')

function create() {
    return {
        isNegate: false,
        data:     []
    }
}

function createPolynomFromNumber(number) {
    var polynom = Polynom.create()

    number.data
        .forEach(function(coefficient) {
            if(number.isNegate)
                Polynom.addTail(polynom, -coefficient)
            else
                Polynom.addTail(polynom, coefficient)
        })

    return polynom
}

function createNumberFromPolynom(polynom) {
    var number = create()

    for(var i in polygon.data) {
        
    }

    return number
}

function addTail(number, tail) {
    number.data.push(tail)
}

function copy(number) {
    return {
        isNegate: number.isNegate,
        data: number.data
            .map(function(tail) {
                return tail
            })
    }
}

function normalize(number) {
    for(var i = number.data.length; i && !number.data[i - 1]; --i)
        number.data.splice(i - 1, 1)
}

function add(number1, number2) {
    var polynom1 = createPolynomFromNumber(number1)
    var polynom2 = createPolynomFromNumber(number2)

    Polynom.add(polynom1, polynom2, function(a, b) {
        return a + b
    })

    console.log(createNumberFromPolynom(polynom1))

    /*var remain = 0

    for(var i = 0; i < number1.data.length && i < number2.data.length; ++i) {
        var sum = number1.data[i] + number2.data[i] + remain
        number1.data[i] = sum % 2
        remain = (sum / 2) | 0
    }

    if(i < number1.data.length) {
        for(; i < number1.data.length; ++i) {
            var sum = number1.data[i] + remain
            number1.data[i] = sum % 2
            remain = (sum / 2) | 0
        }
    }
    else {
        for(; i < number2.data.length; ++i) {
            var sum = number2.data[i] + remain
            addTail(number1, sum % 2)
            remain = (sum / 2) | 0
        }
    }

    if(remain)
        addTail(number1, remain)*/
}

function sub(number1, number2) {

}

function multiply(number1, number2) {

}

function divide(number1, number2) {

}

var zero = create()
addTail(zero, 0)

var one = create()
addTail(one, 1)


module.exports = {
    zero:     zero,
    one:      one,

    create:   create,
    addTail:  addTail,
    copy:     copy,
    add:      add,
    sub:      sub,
    multiply: multiply,
    divide:   divide
}
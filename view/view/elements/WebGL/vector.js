function create(point1, point2) {
    return [
        point2[0] - point1[0],
        point2[1] - point1[1],
        point2[2] - point1[2]
    ]
}

function length(vector) {
    var sum = 0

    for(var i = 0; i < vector.length; ++i)
        sum += vector[i] * vector[i]

    return Math.sqrt(sum)
}

function normalize(vector) {
    var vectorLength = length(vector)

    for(var i = 0; i < vector.length; ++i)
        vector[i] /= vectorLength
}

function crossProduct(vector1, vector2) {
    return [
        vector1[1] * vector2[2] - vector1[2] * vector2[1],
        vector1[0] * vector2[2] - vector1[2] * vector2[0],
        vector1[0] * vector2[1] - vector1[1] * vector2[0]
    ]
}

module.exports = {
    create:       create,
    length:       length,
    normalize:    normalize,
    crossProduct: crossProduct
}
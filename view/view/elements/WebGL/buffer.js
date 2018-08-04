function create(gl, data, type) {
    var buffer = gl.createBuffer()

    gl.bindBuffer(type, buffer)
    gl.bufferData(type, data, gl.STATIC_DRAW)

    return buffer
}

module.exports = {
    create: create
}
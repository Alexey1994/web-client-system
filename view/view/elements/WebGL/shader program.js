function createShader(gl, code, type) {
    var shader = gl.createShader(type)
    gl.shaderSource(shader, code)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var shaderLog = gl.getShaderInfoLog(shader)

        if(type == gl.VERTEX_SHADER)
            shaderLog = 'vertex shader error:\n' + shaderLog
        else if(type == gl.FRAGMENT_SHADER)
            shaderLog = 'fragment shader error:\n' + shaderLog

        console.error(shaderLog)
        gl.deleteShader(shader)

        return null
    }

    return shader
}

function create(gl, vertexShader, fragmentShader) {
    var vertexShader = createShader(gl, vertexShader, gl.VERTEX_SHADER)
    var fragmentShader = createShader(gl, fragmentShader, gl.FRAGMENT_SHADER)

    if(!vertexShader || !fragmentShader)
        return null

    var program = gl.createProgram()

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)

    return program
}

module.exports = {
    create: create
}
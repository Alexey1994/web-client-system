var ShaderProgram = require('./shader program.js')
var ShaderModel = require('./shader model.js')
var Buffer = require('./buffer.js')
var Vector = require('./vector.js')

var shader
var shaderModel

function createNormals(vertices) {
    var normals = []

    function addNormal(normal) {
        normals.push(normal[0])
        normals.push(normal[1])
        normals.push(normal[2])
    }

    for(var i = 0; i < vertices.length; i += 9) {
        var point1 = [
            vertices[i],
            vertices[i + 1],
            vertices[i + 2]
        ]
        var point2 = [
            vertices[i + 3],
            vertices[i + 4],
            vertices[i + 5]
        ]
        var point3 = [
            vertices[i + 6],
            vertices[i + 7],
            vertices[i + 8]
        ]

        var vector1 = Vector.create(point1, point2)
        var vector2 = Vector.create(point1, point3)

        var normal = Vector.crossProduct(vector1, vector2)
        Vector.normalize(normal)

        addNormal(normal)
        addNormal(normal)
        addNormal(normal)
    }

    return normals
}

function create(gl, vertices) {
    if(!shader) {
        shader = ShaderProgram.create(
            gl,
            get('shaders/static model/vertex shader.c'),
            get('shaders/static model/fragment shader.c')
        )
    }

    if(!shaderModel) {
        shaderModel = ShaderModel.create(gl, shader, {
            vertex:      'attribute vec3 pointer',
            normal:      'attribute vec3 pointer',
            color:       'attribute vec4 pointer',

            view_matrix: 'uniform mat4',
            view_point:  'uniform vec3'
        })
    }

    var normals = new Float32Array(createNormals(vertices))
    vertices = new Float32Array(vertices)

    var vertexBuffer = Buffer.create(gl, vertices, gl.ARRAY_BUFFER)
    var normalBuffer = Buffer.create(gl, normals, gl.ARRAY_BUFFER)

    var colorBuffer = Buffer.create(gl, new Float32Array([
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1
    ]), gl.ARRAY_BUFFER)

    return {
        vertexBuffer: vertexBuffer,
        vertices: vertices,
        length: vertices.length / 3,

        normalBuffer: normalBuffer,
        normals: normals,

        colorBuffer: colorBuffer
    }
}

function draw(gl, model) {
    gl.useProgram(shader)

    shaderModel.view_matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]

    shaderModel.view_point = [
        0,
        Mouse.values.y / gl.viewportHeight * 2 - 1,
        Mouse.values.x / gl.viewportWidth * 2 - 1
    ]

    shaderModel.vertex = model.vertexBuffer
    shaderModel.normal = model.normalBuffer
    shaderModel.color = model.colorBuffer

    gl.drawArrays(gl.TRIANGLES, 0, model.length)
}

module.exports = {
    create: create,
    draw:   draw
}
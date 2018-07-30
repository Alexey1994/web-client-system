var View = require('../../view.js')

function add(view) {
    View.add(view, 'WebGL', function(element, model) {
        var reference = element.reference
        var style = reference.style

        style.display = 'inline-block'
        style.width        = model.width
        style.height       = model.height

        if(model.backgroundColor)
            style.backgroundColor = model.backgroundColor

        if(model.boxShadow)
            style.boxShadow = model.boxShadow

        if(model.zIndex)
            style.zIndex = model.zIndex

        if(model.margin)
            style.margin = model.margin

        var canvas = document.createElement('canvas')
        //var style = canvas.style

        canvas.width = reference.clientWidth
        canvas.height = reference.clientHeight

        reference.appendChild(canvas)

        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

        gl.viewportWidth = canvas.width
        gl.viewportHeight = canvas.height

        gl.clearColor(0.0, 0.0, 0.0, 1.0)

        function createShader(code, type) {
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

        function createShaderProgram(vertexShader, fragmentShader) {
            var vertexShader = createShader(vertexShader, gl.VERTEX_SHADER)
            var fragmentShader = createShader(fragmentShader, gl.FRAGMENT_SHADER)

            if(!vertexShader || !fragmentShader)
                return null

            var program = gl.createProgram()

            gl.attachShader(program, vertexShader)
            gl.attachShader(program, fragmentShader)

            gl.linkProgram(program)

            return program
        }

        function createShaderModel(shader, model) {
            var variables = {}

            for(var i in model) {
                var type = model[i]

                function f(name, type) {
                    if(type.indexOf('attribute') !== -1) {
                        var location = gl.getAttribLocation(shader, name)

                        variables[name] = {
                            value: null,
                            set: function() {
                                console.log(location)
                            }
                        }
                    }
                    else if(type.indexOf('uniform') !== -1) {
                        var location = gl.getUniformLocation(shader, name)

                        variables[name] = {
                            value: null,
                            set: function(value) {
                                gl.uniformMatrix4fv(location, false, value)
                            }
                        }
                    }
                }

                f(i, model[i])
            }

            return new Proxy(
                variables,

                {
                    get: function(variables, variableName) {
                        return variables[variableName].value
                    },

                    set: function(variables, variableName, value) {
                        variables[variableName].set(value)
                    }
                }
            )
        }

        function createBuffer(data, type) {
            var buffer = gl.createBuffer()

            gl.bindBuffer(type, buffer)
            gl.bufferData(type, data, gl.STATIC_DRAW)

            return buffer
        }

        function createVector(point1, point2) {
            return [
                point2[0] - point1[0],
                point2[1] - point1[1],
                point2[2] - point1[2]
            ]
        }

        function crossProduct(vector1, vector2) {
            return [
                vector1[1] * vector2[2] - vector1[2] * vector2[1],
                vector1[0] * vector2[2] - vector1[2] * vector2[0],
                vector1[0] * vector2[1] - vector1[1] * vector2[0]
            ]
        }

        function createNormals(vertices, indices) {
            var normals = []

            function addNormal(normal) {
                normals.push(normal[0])
                normals.push(normal[1])
                normals.push(normal[2])
            }

            for(var i = 0; i < indices.length; i += 3) {
                var point1 = [
                    vertices[indices[i] * 3],
                    vertices[indices[i] * 3 + 1],
                    vertices[indices[i] * 3 + 2]
                ]
                var point2 = [
                    vertices[indices[i + 1] * 3],
                    vertices[indices[i + 1] * 3 + 1],
                    vertices[indices[i + 1] * 3 + 2]
                ]
                var point3 = [
                    vertices[indices[i + 2] * 3],
                    vertices[indices[i + 2] * 3 + 1],
                    vertices[indices[i + 2] * 3 + 2]
                ]

                var vector1 = createVector(point1, point2)
                var vector2 = createVector(point1, point3)

                var normal = crossProduct(vector1, vector2)
                
                addNormal(normal)
                addNormal(normal)
                addNormal(normal)
            }

            return normals
        }

        var shader = createShaderProgram(
            get('shaders/static model/vertex shader.c'),
            get('shaders/static model/fragment shader.c')
        )

        var shaderModel = createShaderModel(shader, {
            vertex:      'attribute vec3',
            normal:      'attribute vec3',
            view_matrix: 'uniform mat4'
        })

        shaderModel.view_matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]

        var vertex = gl.getAttribLocation(shader, 'vertex')
        gl.enableVertexAttribArray(vertex)

        var normal = gl.getAttribLocation(shader, 'normal')
        gl.enableVertexAttribArray(normal)

        var viewMatrix = gl.getUniformLocation(shader, 'view_matrix')

        function createStaticModel(vertices, indices) {
            var normals = new Float32Array(createNormals(vertices, indices))
            vertices = new Float32Array(vertices)
            indices = new Uint16Array(indices)

            var vertexBuffer = createBuffer(vertices, gl.ARRAY_BUFFER)
            var indexBuffer = createBuffer(indices, gl.ELEMENT_ARRAY_BUFFER)
            var normalBuffer = createBuffer(normals, gl.ARRAY_BUFFER)

            return {
                vertexBuffer: vertexBuffer,
                vertices: vertices,

                indexBuffer: indexBuffer,
                indices: indices,

                normalBuffer: normalBuffer,
                normals: normals
            }
        }

        function drawStaticModel(model) {
            gl.useProgram(shader)

            gl.uniformMatrix4fv(viewMatrix, false, [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ])

            gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexBuffer)
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer)
            gl.vertexAttribPointer(vertex, 3, gl.FLOAT, false, 0, 0)

            gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer)
            gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0, 0)

            gl.drawElements(gl.TRIANGLES, model.indices.length, gl.UNSIGNED_SHORT, 0)
        }

        //setInterval(function() {
            //gl.clear(gl.BUFFER_BIT)
            model.draw(gl, createStaticModel, drawStaticModel)
        //}, 10)
    })
}

module.exports = {
    add: add
}
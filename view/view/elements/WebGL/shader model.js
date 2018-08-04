function create(gl, shader, model) {
    var variables = {}

    for(var i in model) {
        var type = model[i]

        function f(name, type) {
            if(type.indexOf('attribute') !== -1) {
                var location = gl.getAttribLocation(shader, name)

                if(type.indexOf('pointer') !== -1) {
                    gl.enableVertexAttribArray(location)

                    if(type.indexOf('vec3') !== -1) {
                        variables[name] = {
                            value: null,
                            set: function(buffer) {
                                gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
                                gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0)
                            }
                        }
                    }
                    else if(type.indexOf('vec4') !== -1) {
                        variables[name] = {
                            value: null,
                            set: function(buffer) {
                                gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
                                gl.vertexAttribPointer(location, 4, gl.FLOAT, false, 0, 0)
                            }
                        }
                    }
                }
                else {
                    if(type.indexOf('vec3') !== -1) {
                        variables[name] = {
                            value: null,
                            set: function(value) {
                                gl.vertexAttrib3fv(location, new Float32Array(value))
                                //gl.vertexAttribPointer(location, buffer)
                            }
                        }
                    }
                    else if(type.indexOf('vec4') !== -1) {
                        variables[name] = {
                            value: null,
                            set: function(value) {
                                gl.vertexAttrib4fv(location, new Float32Array(value))
                            }
                        }
                    }
                }
            }
            else if(type.indexOf('uniform') !== -1) {
                var location = gl.getUniformLocation(shader, name)

                if(type.indexOf('vec3') !== -1) {
                    variables[name] = {
                        value: null,
                        set: function(value) {
                            gl.uniform3fv(location, new Float32Array(value))
                        }
                    }
                }
                else if(type.indexOf('vec4') !== -1) {
                    variables[name] = {
                        value: null,
                        set: function(value) {
                            gl.uniform4fv(getAttribLocation, new Float32Array(value))
                        }
                    }
                }
                else if(type.indexOf('mat4') !== -1) {
                    variables[name] = {
                        value: null,
                        set: function(value) {
                            gl.uniformMatrix4fv(location, false, new Float32Array(value))
                        }
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

module.exports = {
    create: create
}
attribute vec3 vertex;
attribute vec3 normal;

uniform   mat4 view_matrix;

varying vec3 fragment_normal;

void main()
{
    gl_Position = view_matrix * vec4(vertex, 1.0);
    fragment_normal = normal;
}
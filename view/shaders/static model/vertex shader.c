attribute vec3 vertex;
attribute vec3 normal;
attribute vec4 color;

uniform mat4 view_matrix;
uniform vec3 view_point;

varying vec4 fragment_color;
varying vec3 fragment_view_point;
varying vec3 fragment_normal;

void main()
{
    gl_Position = view_matrix * vec4(vertex, 1.0);
    fragment_color = color;
    fragment_view_point = view_point;
    fragment_normal = normal;
}
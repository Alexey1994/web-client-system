precision mediump float;

varying vec4 fragment_color;
varying vec3 fragment_view_point;
varying vec3 fragment_normal;

void main()
{
    float angle = dot(fragment_view_point, fragment_normal);

    gl_FragColor = vec4(
        angle * fragment_color[0],
        angle * fragment_color[1],
        angle * fragment_color[2],
        fragment_color[3]
    );

    //gl_FragColor = fragment_color;
}
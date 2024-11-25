

uniform vec3 u_color; // Base water color
uniform float u_time; // Time for color animation

void main() {
    // Calculate a simple gradient for the water effect
    float gradient = gl_FragCoord.y / 500.0; // Adjust for screen resolution
    float rippleColor = 0.5 + 0.5 * sin(u_time + gl_FragCoord.x * 0.05);

    vec3 color = u_color * (0.5 + 0.5 * gradient) + vec3(0.1 * rippleColor, 0.2, 0.3);
    gl_FragColor = vec4(color, 1.0); // Final color with full alpha
}
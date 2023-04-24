#ifdef GL_ES
precision highp float;
#endif
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main() {
	vec4 color = texture2D(uSampler, vec2(0.0,0.01) + vTextureCoord);

	float gradient = texture2D(uSampler2,vec2(0.0, 0.01) +  vTextureCoord).b * 1.0;

	vec4 filter = texture2D(uSampler3, vec2(1.0 - gradient, 1.0 - gradient));
	
	gl_FragColor = (color + filter) / 2.0;
}
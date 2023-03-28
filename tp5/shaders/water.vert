attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;

uniform float timeFactor; 
varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {

    vec3 offset=vec3(0.0,0.0,0.0);

	vTextureCoord = aTextureCoord;


	float gradient =  texture2D(uSampler2, vec2(sin(timeFactor*0.03),sin(timeFactor*0.03))+vTextureCoord).b;

	offset=aVertexNormal*normScale*0.003*gradient;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}

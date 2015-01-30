// JavaScript Document


//Sarah Selby
//January 27, 2015


var gl;
var points;
var toggle = 0;

var bufferIdtriangle, bufferIdsquare, bufferIdshape;
var vPositiontriangle, vPositionsquare, vPositionshape;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
	
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	//TRIANGLE
	var triangle_vertices = [vec2(-1, -1), vec2(0, 1), vec2(1, -1)];
	
	//SQUARE
	var square_vertices = [vec2(-0.5, -0.5), vec2(-0.5, 0.5), vec2(0.5, 0.5), vec2(0.5, -0.5)];
	
	//SHAPE
	var shape_vertices = [vec2( -0.5, -1.0), vec2(  -1.0,  0.0 ), vec2(  0.0, 1.0 ), vec2( 1.0, 0.0), vec2( 0.5, -1.0)];

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // LOAD the data into the GPU
	
	bufferIdtriangle = gl.createBuffer(); 
	bufferIdsquare = gl.createBuffer(); 
	bufferIdshape = gl.createBuffer();
	
	
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdtriangle );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(triangle_vertices), gl.STATIC_DRAW );
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdsquare );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(square_vertices), gl.STATIC_DRAW );
	
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdshape );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(shape_vertices), gl.STATIC_DRAW );

    // Associate shader variables with our data buffer
	
	vPositiontriangle = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositiontriangle, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositiontriangle );
	
	vPositionsquare = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionsquare, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionsquare );
	
	vPositionshape = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionshape, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionshape );
	
	canvas.addEventListener("mousedown", toggleShape, false);

	
	render();
};



function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}



function toggleShape(){
	//console.log("Canvas Clicked");
	if(toggle == 0){
		//console.log("toggle == 0");
   		gl.vertexAttribPointer( vPositionsquare, 2, gl.FLOAT, false, 0, 0 );
		gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
		
		toggle++;
		return;
		}
	if(toggle == 1){
		//console.log("toggle == 1");
    	gl.vertexAttribPointer( vPositionshape, 2, gl.FLOAT, false, 0, 0 );
		gl.drawArrays( gl.TRIANGLE_FAN, 0, 5 );
		
		toggle++;
		return;
		}
	if(toggle == 2){
		//console.log("toggle == 2");
		gl.vertexAttribPointer( vPositiontriangle, 2, gl.FLOAT, false, 0, 0 );
		gl.drawArrays(gl.TRIANGLES, 0, 3);
		
		toggle= 0;
		return;
		}
	}

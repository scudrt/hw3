var graphWidth = window.innerWidth * 0.8;
var graphHeight = window.innerHeight;
var buttonPadWidth = window.innerWidth - graphWidth;
var buttonPadHeight = window.innerHeight;
const SQUAREROOT3 = Math.sqrt(3);

var scene = new THREE.Scene();
var geometry = new  THREE.Geometry();
var camera = new THREE.PerspectiveCamera(75, graphWidth/graphHeight, 0.1, 1000);
var material = new THREE.LineBasicMaterial({color:0xffffff});

//set renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(graphWidth, graphHeight);
document.body.appendChild(renderer.domElement);
var buttonPad = document.getElementById('buttonPad');

//set position of camera
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 8;

var vertice = [new THREE.Vector3(-1, 0, 0),
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(0, SQUAREROOT3, 0)]
//initialise
function generateGraph(){
    for (var i=0;i<3;++i){
        geometry.vertices.push(vertice[i]);
    }
    geometry.vertices.push(vertice[0]);

    var graph = new THREE.Line(geometry, material, THREE.LineSegment);
    graph.matrixAutoUpdate = false;
    return graph;
}

function generateAxis(){
    const LIMIT = 10;
    var tempGeo = new THREE.Geometry();
    //x axis
    tempGeo.vertices.push(new THREE.Vector3(-LIMIT, 0, 0));
    tempGeo.vertices.push(new THREE.Vector3(LIMIT, 0, 0));
    var xaxis = new THREE.Line(tempGeo, material, THREE.LineSegment);
    //y axis
    var yaxis = new THREE.Line(tempGeo, material, THREE.LineSegment);
    yaxis.rotation.z += 1.5707963; // PI / 2
    scene.add(xaxis);
    scene.add(yaxis);
}

//initialise matrices
var transformMatrix = new THREE.Matrix4();
var tempMatrix = new THREE.Matrix4();
transformMatrix.identity();

//TRANSLATE
function onTranslateXInc(){
    tempMatrix.set(
        1, 0, 0, 0.5,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}
function onTranslateXDec(){
    tempMatrix.set(
        1, 0, 0, -0.5,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}
function onTranslateYInc(){
    tempMatrix.set(
        1, 0, 0, 0,
        0, 1, 0, 0.5,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}
function onTranslateYDec(){
    tempMatrix.set(
        1, 0, 0, 0,
        0, 1, 0, -0.5,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}

//ROTATION
var cos = Math.sqrt(SQUAREROOT3+2) / 2;
var sin = Math.sqrt(2-SQUAREROOT3) / 2;
function onClockwiseRotation(){
    tempMatrix.set(
        cos, sin, 0, 0,
        -sin, cos, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}
function onAnticlockwiseRotation(){
    tempMatrix.set(
        cos, -sin, 0, 0,
        sin, cos, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}

//SCALE
function onScaleXInc(){
    tempMatrix.set(
        1.1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}
function onScaleXDec(){
    tempMatrix.set(
        0.9, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}
function onScaleYInc(){
    tempMatrix.set(
        1, 0, 0, 0,
        0, 1.1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}
function onScaleYDec(){
    tempMatrix.set(
        1, 0, 0, 0,
        0, 0.9, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}

//SHEAR
function onShearXInc(){
    tempMatrix.set(
        1, 0.5, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}
function onShearXDec(){
    tempMatrix.set(
        1, -0.5, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}
function onShearYInc(){
    tempMatrix.set(
        1, 0, 0, 0,
        0.5, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}
function onShearYDec(){
    tempMatrix.set(
        1, 0, 0, 0,
        -0.5, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}

//REFLECT
function onReflectX(){
    tempMatrix.set(
        1, 0, 0, 0,
        0, -1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}
function onReflectY(){
    tempMatrix.set(
        -1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    transformMatrix.premultiply(tempMatrix);
}

//render function
var render = function(){
    requestAnimationFrame(render);
    graph.matrix.copy(transformMatrix);
    renderer.render(scene, camera);
}

generateAxis();
var graph = generateGraph();
scene.add(graph);
render();

var graphWidth = window.innerWidth;
var graphHeight = window.innerHeight;
const SQUAREROOT3 = Math.sqrt(3);

//global values
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, graphWidth/graphHeight, 0.1, 1000);
scene.add(camera);
var isPerspective = true;

var model = createMyModel();

//set renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(graphWidth, graphHeight);
document.body.appendChild(renderer.domElement);

//set position of camera
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 40;

//return a created object, and you can perform operations on it
function createMyModel(){
    var model = new THREE.Mesh(
        new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
        new THREE.MeshBasicMaterial( { color: 0xaa00ff } )
    );
    model.matrixAutoUpdate = false;
    scene.add(model);
    return model;
}

// function called when a key was pressed
document.onkeypress = function(event){
    var code = String.fromCharCode(
        event.keyCode
    ).toUpperCase();
    if ('W' == code){
        ;
    }else if ('S' == code){
        ;
    }else if ('A' == code){
        ;
    }else if ('D' == code){
        ;
    }else if ('J' == code){
        scaleModel(0.95);
    }else if ('L' == code){
        scaleModel(1.05);
    }else if ('P' == code){
        switchProjection();
    }
}

var eye = new THREE.Matrix4();
eye.identity();
function scaleModel(scaleDelta){
    var scaleMatrix = new THREE.Matrix4();
    scaleMatrix.set(
        scaleDelta, 0, 0, 0,
        0, scaleDelta, 0, 0,
        0, 0, scaleDelta, 0,
        0, 0, 0, 1
    );
    eye.premultiply(scaleMatrix);
}

function changeViewport(VPMatrix){
}

function lookUpBy(delta){ //radian
    camera.lookat();
}

function lookLeftBy(delta){ //radian
    camera.lookat();
}

function switchProjection(){
    isPerspective = !isPerspective;
    var cameraPosition = camera.position.clone();
    scene.remove(camera);
    if (isPerspective){
        camera = new THREE.PerspectiveCamera(75, graphWidth/graphHeight, 0.1, 1000);
    }else{
        camera = new THREE.OrthographicCamera(
            graphWidth / -2, graphWidth / 2,
            graphHeight / -2, graphHeight / 2,
            0.1, 1000
        );
    }
    console.log(cameraPosition);
    camera.position.copy(cameraPosition);
}

//render function
var render = function(){
    requestAnimationFrame(render);
    model.matrix.copy(eye);
    renderer.render(scene, camera);
}
render();

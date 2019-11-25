var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;
var graphWidth = 0.6 * innerHeight;
var graphHeight = 0.6 * innerHeight;
var window_resize = false;
var canvas;

const SQUAREROOT3 = Math.sqrt(3);

//global values
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, graphWidth/graphHeight, 0.1, 1000);
scene.add(camera);

var isPerspective = true;

var model = createMyModel();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(graphWidth, graphHeight);
document.body.appendChild(renderer.domElement);
canvas = document.getElementsByTagName('canvas');

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
    scene.add(model);
    return model;
}

// function called when a key was pressed
document.onkeypress = function(event){
    var code = String.fromCharCode(
        event.keyCode
    ).toUpperCase();
    if ('W' == code){
        lookUpBy(2);
    }else if ('S' == code){
        lookUpBy(-2);
    }else if ('A' == code){
        lookRightBy(-2);
    }else if ('D' == code){
        lookRightBy(2);
    }else if ('J' == code){
        scaleModel(-0.02);
    }else if ('L' == code){
        scaleModel(0.02);
    }else if ('P' == code){
        switchProjection();
    }
}

var eye = new THREE.Matrix4();
eye.identity();
function scaleModel(scaleDelta){
    model.scale.x += scaleDelta;
    model.scale.y += scaleDelta;
}

function lookUpBy(delta){ //degree to radian
    delta = delta * Math.PI / 180.0;
    var cos = Math.cos(delta),
        sin = Math.sin(delta);
    var y = camera.position.y,
        z = camera.position.z;
    camera.position.y = y * cos + z * sin;
    camera.position.z = z * cos - y * sin;
    camera.lookAt(model.position);
}

function lookRightBy(delta){ //degree to radian
    delta = delta * Math.PI / 180.0;
    var cos = Math.cos(delta),
        sin = Math.sin(delta);
    var x = camera.position.x,
        z = camera.position.z;
    camera.position.x = x * cos - z * sin;
    camera.position.z = z * cos + x * sin;
    camera.lookAt(model.position);
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
    camera.position.copy(cameraPosition);
}

//render function
var render = function(){
    requestAnimationFrame(render);
    if (window_resize){
        let min_len = Math.min(innerHeight, innerWidth);
        canvas.width = 0.6 * min_len;
        canvas.height = 0.6 * min_len;
        renderer.setSize(canvas.width, canvas.height);
        window_resize = false;
    }
    renderer.render(scene, camera);
}
render();

window.onresize=function(){
    innerHeight = document.documentElement.clientHeight;
    innerWidth = document.documentElement.clientWidth;

    window_resize = true;
}
var graphWidth = window.innerWidth;
var graphHeight = window.innerHeight;
const SQUAREROOT3 = Math.sqrt(3);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, graphWidth/graphHeight, 0.1, 1000);

//set renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(graphWidth, graphHeight);
document.body.appendChild(renderer.domElement);

//set position of camera
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 8;

//return a created object, and you can perform operations on it
function createMyObject(){
    var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    scene.add(cube);
    return cube;
}

//render function
var render = function(){
    requestAnimationFrame(render);
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    renderer.render(scene, camera);
}

var cube = createMyObject();
render();

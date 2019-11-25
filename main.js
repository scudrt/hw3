var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;
var graphWidth = 0.7 * innerHeight;
var graphHeight = 0.7 * innerHeight;
var window_resize = false;
var canvas;
var loader = new THREE.OBJLoader();
const SQUAREROOT3 = Math.sqrt(3);

//global values
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, graphWidth/graphHeight, 0.1, 1000);
scene.add(camera);
var light;
scene.add(light);

var isPerspective = true;

var model = createMyModel();

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff,1.0);
renderer.setSize(graphWidth, graphHeight);
document.body.appendChild(renderer.domElement);
canvas = document.getElementsByTagName('canvas');

//set position of camera
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 40;

//return a created object, and you can perform operations on it
function createMyModel(){
    loader.load( "pinecone.obj", function ( loadedMesh ) {
        var material = new THREE.MeshLambertMaterial({color: 0x5C3A21});

        // 加载完obj文件是一个场景组，遍历它的子元素，赋值纹理并且更新面和点的发现了
        loadedMesh.children.forEach(function (child) {
            //给每个子元素赋值纹理
            child.material = material;
            //更新每个子元素的面和顶点的法向量
            child.geometry.computeFaceNormals();
            child.geometry.computeVertexNormals();
        });

        //模型放大一百倍
        loadedMesh.scale.set(100, 100, 100);

        //添加到场景当中
        scene.add(loadedMesh);
        model = loadedMesh;


    } );
    // var model = new THREE.Mesh(
    //     new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
    //     new THREE.MeshBasicMaterial( { color: 0xaa00ff } )
    // );
    // scene.add(model);
    return model;
}

// function called when a key was pressed
document.onkeypress = function(event){
    var code = String.fromCharCode(
        event.keyCode
    ).toUpperCase();
    if ('W' == code){
        lookUpBy(1);
    }else if ('S' == code){
        lookUpBy(-1);
    }else if ('A' == code){
        lookLeftBy(1);
    }else if ('D' == code){
        lookLeftBy(-1);
    }else if ('J' == code){
        scaleModel(-0.1);
    }else if ('L' == code){
        scaleModel(0.1);
    }else if ('P' == code){
        switchProjection();
    }
}

var eye = new THREE.Matrix4();
eye.identity();
function scaleModel(scaleDelta){
    model.scale.x += scaleDelta;
    if (model.scale.x<=0){
        model.scale.x = Math.pow(10, -5);
    }
    model.scale.y += scaleDelta;
    if (model.scale.y<=0){
        model.scale.y = Math.pow(10, -5);
    }
}

function changeViewport(VPMatrix){
}

function lookUpBy(delta){ //degree to radian
    delta = delta / 180 * Math.PI;
    var cos = Math.cos(delta),
        sin = Math.sin(delta);
}

function lookLeftBy(delta){ //degree to radian
    delta = delta / 180 * Math.PI;
    var cos = Math.cos(delta),
        sin = Math.sin(delta);
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

    if (window_resize){
        let min_len = Math.min(innerHeight, innerWidth);
        canvas.width = 0.7 * min_len;
        canvas.height = 0.7 * min_len;
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


function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.PointLight(0xffffff);
    light.position.set(0,0,100);

    //告诉平行光需要开启阴影投射
    light.castShadow = true;

    scene.add(light);
}

initLight();
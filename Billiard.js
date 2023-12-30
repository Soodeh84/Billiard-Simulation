"use strict";

import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";


// * Initialize webGL
const canvas = document.getElementById("myCanvas");
const renderer = new THREE.WebGLRenderer({canvas,
                                          antialias: true});
renderer.setClearColor('black');    // set background color
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 15, canvas.width / canvas.height,
                                            0.1, 1000 );

window.addEventListener("resize", function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});

camera.position.set(15, 7, 17);
camera.lookAt(scene.position);

//add spot light and shadow******************************
scene.add(new THREE.AmbientLight('#ffffff'));
const light = new THREE.SpotLight('#ffffff');
light.position.set(0,2.9,0);
light.castShadow = true;
light.intensity = 40;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.2;
light.shadow.camera.far = 500;
scene.add(light);


// TODO: remove these in the final version1**********************************************************************************
/* const spotLightHelper = new THREE.SpotLightHelper( light );
scene.add( spotLightHelper );
const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );
scene.add(new THREE.AxesHelper()); */
//ballMesh.add(new THREE.AxesHelper(0.5));
/*******************************************************Ground*************************************************************/
const groundX = 6;
const groundZ = 8;
const groundMesh = new THREE.Mesh( new THREE.PlaneGeometry( groundX, groundZ), 
                                   new THREE.MeshStandardMaterial({wireframe:false, 
                                                                color: 'gray', 
                                                                opacity: 0.5,
                                                                side: THREE.DoubleSide}));

groundMesh.rotation.x = Math.PI/2;
groundMesh.receiveShadow = true;
scene.add( groundMesh );
/******************************************************ceiling********************************************************** */
const ceilingMesh = new THREE.Mesh( new THREE.PlaneGeometry( groundX, groundZ), 
                                   new THREE.MeshStandardMaterial({wireframe:false, 
                                                                color: 'gray', 
                                                                opacity: 0.5,
                                                                side: THREE.DoubleSide}));

ceilingMesh.rotation.x = Math.PI/2;
ceilingMesh.position.set(0,4,0);
scene.add( ceilingMesh );
/******************************************************cord************************************************************ */
const cordWidth = 0.01;
const cordHeight = 1.0;
const cordDepth = 0.01;
const cordMesh = new THREE.Mesh(new THREE.BoxGeometry(cordWidth, cordHeight, cordDepth),
                                 new THREE.MeshStandardMaterial({color: 'white'}));
cordMesh.position.set(0,3.4,0);
scene.add(cordMesh);
/*******************************************************lightbulb******************************************************** */
const lightBulbRad = 0.07;
const lightBulbMesh = new THREE.Mesh(new THREE.SphereGeometry(lightBulbRad),
                                     new THREE.MeshStandardMaterial({color: 'yellow'}));
lightBulbMesh.position.set(0,2.9,0);
scene.add(lightBulbMesh);
/*******************************************************Table*************************************************************/
const tableWidth = 1.37;
const tableHeight = 2.74;
const tableDepth = 0.1;
const tableMesh = new THREE.Mesh(new THREE.BoxGeometry(tableWidth, tableHeight, tableDepth),
                                 new THREE.MeshStandardMaterial({color: 'green',
                                                              side: THREE.DoubleSide}));
tableMesh.castShadow = true;
tableMesh.receiveShadow = true;
tableMesh.rotation.x = Math.PI/2;
tableMesh.position.set(0,0.85,0);
scene.add(tableMesh);
//------cushions----------
const cushionWidth = 0.1;
const cushionHeight = 2.70;
const cushionDepth = 0.15;
//top and bottom
const cushionsT_B =[
  {x: 0.67, y:0.89, z: 0},
  {x:-0.67, y:0.89, z: 0}
];
for (let i=0; i<cushionsT_B.length; i++){
  const cushionMeshA = new THREE.Mesh(new THREE.BoxGeometry(cushionWidth, cushionHeight, cushionDepth),
                                      new THREE.MeshStandardMaterial({color: '#2e8b57',
                                                                   side: THREE.DoubleSide}));
  cushionMeshA.rotation.x = Math.PI/2;
  cushionMeshA.position.set(cushionsT_B[i].x,cushionsT_B[i].y,cushionsT_B[i].z);
  cushionMeshA.castShadow = true;
  scene.add(cushionMeshA);
}

//left and right
const cushionsL_R =[
  {x: 0, y:0.89, z: 1.35},
  {x: 0, y:0.89, z: -1.35}
];
for (let i=0; i<cushionsL_R.length; i++){
  const cushionMeshB = new THREE.Mesh(new THREE.BoxGeometry(cushionHeight-1.26,cushionWidth, cushionDepth),
                                      new THREE.MeshStandardMaterial({color: '#2e8b57',
                                                                   side: THREE.DoubleSide}));
  cushionMeshB.rotation.x = Math.PI/2;
  cushionMeshB.position.set(cushionsL_R[i].x,cushionsL_R[i].y,cushionsL_R[i].z);
  cushionMeshB.castShadow = true;
  scene.add(cushionMeshB);
}


//-------Legs--------
const legsWidth = 0.1;
const legsHeight = 0.1;
const legsDepth = 0.85;
//array to store legs positions
const legs = [
              {x: 0.6, y: 0.42, z: 1.2},
              {x:-0.6, y: 0.42, z: 1.2},
              {x: 0.6, y: 0.42, z: -1.2},
              {x:-0.6, y: 0.42, z: -1.2}
              ];
for (let i=0; i<legs.length; i++){
  const legMeshA = new THREE.Mesh(new THREE.BoxGeometry(legsWidth, legsHeight, legsDepth),
                                 new THREE.MeshStandardMaterial({color: '#8b008b',
                                                              side: THREE.DoubleSide}));
legMeshA.rotation.x = Math.PI/2;
legMeshA.position.set(legs[i].x,legs[i].y,legs[i].z);
legMeshA.castShadow = true;
scene.add(legMeshA);
}
//*******************************Balls*********************************************************************************** */
//ball textures
const ball8  = new THREE.TextureLoader().load('PoolBallSkins/Ball8.jpg');
const ball9  = new THREE.TextureLoader().load('PoolBallSkins/Ball9.jpg');
const ball10 = new THREE.TextureLoader().load('PoolBallSkins/Ball10.jpg');
const ball11 = new THREE.TextureLoader().load('PoolBallSkins/Ball11.jpg');
const ball12 = new THREE.TextureLoader().load('PoolBallSkins/Ball12.jpg');
const ball13 = new THREE.TextureLoader().load('PoolBallSkins/Ball13.jpg');
const ball14 = new THREE.TextureLoader().load('PoolBallSkins/Ball14.jpg');
const ball15 = new THREE.TextureLoader().load('PoolBallSkins/Ball15.jpg');
/* const textures = [{ball8: new THREE.TextureLoader().load('PoolBallSkins/Ball8.jpg')},
                     {ball9: new THREE.TextureLoader().load('PoolBallSkins/Ball9.jpg')},
                     {ball10: new THREE.TextureLoader().load('PoolBallSkins/Ball10.jpg')},
                     {ball11: new THREE.TextureLoader().load('PoolBallSkins/Ball11.jpg')},
                     {ball12: new THREE.TextureLoader().load('PoolBallSkins/Ball12.jpg')},
                     {ball13: new THREE.TextureLoader().load('PoolBallSkins/Ball13.jpg')},
                     {ball14: new THREE.TextureLoader().load('PoolBallSkins/Ball14.jpg')},
                     {ball15: new THREE.TextureLoader().load('PoolBallSkins/Ball15.jpg')}
                    ]; */

//add balls
const ballRad = 0.06;
/* const ballMesh = new THREE.Mesh(new THREE.SphereGeometry(ballRad, 10,6),
                                new THREE.MeshBasicMaterial( {color: 'black',
                                                              wireframeLinewidth:2,
                                                              wireframe:true})); */
const ballMesh = new THREE.Mesh(new THREE.SphereGeometry(ballRad, 10,6),
                                new THREE.MeshStandardMaterial( {map: ball10}));
ballMesh.matrixAutoUpdate = false;
ballMesh.castShadow = true;
scene.add(ballMesh);
// speed and current position of translational motion
//let ballSpeed = new THREE.Vector3(2*Math.random(), 0, 2*Math.random());
let ballSpeed = new THREE.Vector3(0.5, 0, 0.5);
let ballPos = new THREE.Vector3(0, 0.96, 0);

// * Render loop**************************************************************************************************************
const computerClock = new THREE.Clock();
const controls = new TrackballControls( camera, renderer.domElement );
const planeNormal = new THREE.Vector3(0,1,0);
function render() {

  requestAnimationFrame(render);

  // Reflection at the cushions
  if(ballPos.x> (tableWidth-2.5*cushionWidth)/2) {
    ballSpeed.x = - Math.abs(ballSpeed.x);
  }
  if(-ballPos.x> (tableWidth-2.5*cushionWidth)/2) {
    ballSpeed.x =  Math.abs(ballSpeed.x);
  }
  if(ballPos.z > (tableHeight-1.5*cushionDepth)/2) {
    ballSpeed.z = - Math.abs(ballSpeed.z);
  }
  if(-ballPos.z > (tableHeight-1.5*cushionDepth)/2) {
    ballSpeed.z =  Math.abs(ballSpeed.z);
  }
  //motion of the ball
  const h = computerClock.getDelta();

  //update position of the ball
  ballPos.add(ballSpeed.clone().multiplyScalar(h));

  const om = ballSpeed.length() / ballRad;
  const axis = planeNormal.clone().cross(ballSpeed).normalize();
 

  const dR = new THREE.Matrix4().makeRotationAxis(axis, om*h);
  ballMesh.matrix.premultiply(dR);
  ballMesh.matrix.setPosition(ballPos);
  

   
  controls.update();
  renderer.render(scene, camera);
}
render();

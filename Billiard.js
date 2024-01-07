"use strict";

import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";


// Initialize webGL
const canvas = document.getElementById("myCanvas");
const renderer = new THREE.WebGLRenderer({canvas,
                                          antialias: true});
renderer.setClearColor('black');    // set background color
renderer.setSize(window.innerWidth, window.innerHeight);
//enable the shadow 
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 12, canvas.width / canvas.height,
                                            0.1, 1000 );

window.addEventListener("resize", function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});

camera.position.set(17, 8, 25);
camera.lookAt(scene.position);

//*********************************************add spot light and shadow************************************************
scene.add(new THREE.AmbientLight('#ffffff'));
const light = new THREE.SpotLight('#ffffff');
light.position.set(0,2.9,0);
light.castShadow = true;
light.intensity = 40;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.2;
scene.add(light);
/*******************************************************Ground*************************************************************/
const groundX = 6;
const groundZ = 8;
const groundMesh = new THREE.Mesh( new THREE.PlaneGeometry( groundX, groundZ), 
                                   new THREE.MeshStandardMaterial({wireframe:false,
                                                                   emissive: '#808080',
                                                                   emissiveIntensity: 0.5, 
                                                                   color: '#808080',
                                                                   side: THREE.DoubleSide}));

groundMesh.rotation.x = Math.PI/2;
groundMesh.receiveShadow = true;
scene.add( groundMesh );
/******************************************************ceiling********************************************************** */
const ceilingMesh = new THREE.Mesh( new THREE.PlaneGeometry( groundX, groundZ), 
                                   new THREE.MeshStandardMaterial({wireframe:false,
                                                                   emissive: '#808080',
                                                                   emissiveIntensity: 1,  
                                                                   color: '#808080', 
                                                                   side: THREE.DoubleSide}));

ceilingMesh.rotation.x = Math.PI/2;
ceilingMesh.position.set(0,4,0);
scene.add( ceilingMesh );
/******************************************************cord************************************************************ */
const cordWidth = 0.01;
const cordHeight = 1.1;
const cordDepth = 0.01;
const cordMesh = new THREE.Mesh(new THREE.BoxGeometry(cordWidth, cordHeight, cordDepth),
                                 new THREE.MeshStandardMaterial({emissive: '#ffffff',
                                                                 emissiveIntensity: 0.5,
                                                                 color: '#ffffff'}));
cordMesh.position.set(0,3.4,0);
scene.add(cordMesh);
/*******************************************************lightbulb******************************************************** */
const lightBulbRad = 0.08;
const lightBulbBaseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05,0.06, 32),
                                     new THREE.MeshStandardMaterial({emissive: '#aaaaaa', 
                                                                     emissiveIntensity: 0.5,
                                                                     color: '#aaaaaa'}));

const lightBulbMesh = new THREE.Mesh(new THREE.SphereGeometry(lightBulbRad, 32, 32),
                                     new THREE.MeshStandardMaterial({emissive: '#FFEE58', 
                                                                     emissiveIntensity: 1,
                                                                     color: '#FFEE58'}));
lightBulbMesh.position.set(0,2.9,0);
lightBulbBaseMesh.position.set(0, 3, 0);


const lightBulb = new THREE.Group();
lightBulb.add(lightBulbBaseMesh);
lightBulb.add(lightBulbMesh);
scene.add(lightBulb);
/*******************************************************Table*************************************************************/
//table size proportion to 9-foot (274.32 by 137.16 cm)
const tableWidth = 1.37;
const tableHeight = 2.74;
const tableDepth = 0.1;
const tableMesh = new THREE.Mesh(new THREE.BoxGeometry(tableWidth, tableHeight, tableDepth),
                                 new THREE.MeshStandardMaterial({color: '#196f3d',
                                                                 side: THREE.DoubleSide,
                                                                 flatShading: false}));
tableMesh.castShadow = true;
tableMesh.receiveShadow = true;
tableMesh.rotation.x = Math.PI/2;
tableMesh.position.set(0,0.85,0);
scene.add(tableMesh);
//------cushions----------
const cushionWidth = 0.1;
const cushionHeight = 2.74;
const cushionDepth = 0.23;
const yValue = 0.89;
//top and bottom
const cushionsT_B =[
                    {x: 0.74, y:yValue, z: 0},
                    {x:-0.74, y:yValue, z: 0}
                  ];
for (let i=0; i<cushionsT_B.length; i++){
  const cushionMeshA = new THREE.Mesh(new THREE.BoxGeometry(cushionWidth, cushionHeight, cushionDepth),
                                      new THREE.MeshStandardMaterial({color: '#2E4053',
                                                                   side: THREE.DoubleSide}));
  cushionMeshA.rotation.x = Math.PI/2;
  cushionMeshA.position.set(cushionsT_B[i].x,cushionsT_B[i].y,cushionsT_B[i].z);
  cushionMeshA.castShadow = true;
  scene.add(cushionMeshA);
}
//left and right
const cushionsL_R =[
                    {x: 0, y:yValue, z: 1.42},
                    {x: 0, y:yValue, z: -1.42}
                  ];
for (let i=0; i<cushionsL_R.length; i++){
  const cushionMeshB = new THREE.Mesh(new THREE.BoxGeometry(cushionHeight-1.16,cushionWidth, cushionDepth),
                                      new THREE.MeshStandardMaterial({color: '#2E4053',
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
const xAxis = 0.6;
const yAxis = 0.43;
const zAxis = 1.2;
//array to store legs positions
const legs = [
              {x: xAxis, y: yAxis, z: zAxis},
              {x:-xAxis, y: yAxis, z: zAxis},
              {x: xAxis, y: yAxis, z: -zAxis},
              {x:-xAxis, y: yAxis, z: -zAxis}
              ];
for (let i=0; i<legs.length; i++){
  const legMeshA = new THREE.Mesh(new THREE.BoxGeometry(legsWidth, legsHeight, legsDepth),
                                  new THREE.MeshStandardMaterial({color: '#2E4053',
                                                                  side: THREE.DoubleSide}));
legMeshA.rotation.x = Math.PI/2;
legMeshA.position.set(legs[i].x,legs[i].y,legs[i].z);
legMeshA.castShadow = true;
scene.add(legMeshA);
}
//*******************************Balls*********************************************************************************** */
//ball textures
const textureUrl = ['PoolBallSkins/Ball8.jpg',
                    'PoolBallSkins/Ball9.jpg',
                    'PoolBallSkins/Ball10.jpg',
                    'PoolBallSkins/Ball11.jpg',
                    'PoolBallSkins/Ball12.jpg',
                    'PoolBallSkins/Ball13.jpg',
                    'PoolBallSkins/Ball14.jpg',
                    'PoolBallSkins/Ball15.jpg'
                    ];
const textures = textureUrl.map(url => new THREE.TextureLoader().load(url));
//add balls
const ballRad = 0.06; 
const ballsArr = [];//store references to each ball

for(let j=0; j<textureUrl.length; j++){
  const ballMesh = new THREE.Mesh(new THREE.SphereGeometry(ballRad, 32,32),
                                  new THREE.MeshStandardMaterial({map: textures[j]}));
  ballMesh.matrixAutoUpdate = false;
  ballMesh.castShadow = true;
  
  scene.add(ballMesh);
  // speed and current position of translational motion for  each ball at random
  const ballSpeed=  new THREE.Vector3(5*Math.random(), 0, 5*Math.random());
  const ballPos=  new THREE.Vector3(Math.random() - 0.5, 0.96, Math.random() - 0.5);
  //store reference to balls in the ballsArr array to access them later 
  ballsArr.push({mesh: ballMesh, speed: ballSpeed, position: ballPos, clock: new THREE.Clock()}); 
}
// * Render loop**************************************************************************************************************
const controls = new TrackballControls( camera, renderer.domElement );

const planeNormal = new THREE.Vector3(0,1,0);
const speedDropReflection = 0.8; //20% drop of speed at reflection off the cushions
const rateOfFriction = 0.2; //for 20% drop of speeds at each second due to friction
const timeInSecond = 1; //to apply friction per second
const collisionDrop = 0.7; //30% drop of speed due to collisions

function render() {

  requestAnimationFrame(render);

  for (let i = 0; i < textureUrl.length; i++) {
    const ball = ballsArr[i];

    // Motion of the balls in this time step
    const h = ball.clock.getDelta();
    ball.clock.elapsedTime += h;

    // Reflection at the cushions
    if (ball.position.x > (tableWidth - cushionWidth) / 2) {
      ball.speed.x = -Math.abs(ball.speed.x) * speedDropReflection;
    }
    if (-ball.position.x > (tableWidth - cushionWidth) / 2) {
      ball.speed.x = Math.abs(ball.speed.x) * speedDropReflection;
    }
    if (ball.position.z > (tableHeight - cushionDepth) / 2) {
      ball.speed.z = -Math.abs(ball.speed.z) * speedDropReflection;
    }
    if (-ball.position.z > (tableHeight - cushionDepth) / 2) {
      ball.speed.z = Math.abs(ball.speed.z) * speedDropReflection;
    }
    // 20% drop of speed due to friction per second
    while (ball.clock.elapsedTime > timeInSecond) {
      ball.speed.multiplyScalar(1 - rateOfFriction); // Multiply each component of the velocity vector by 0.8 => 20% drop of speed
      ball.clock.elapsedTime -= timeInSecond;
    }
    ball.position.add(ball.speed.clone().multiplyScalar(h));

    for (let j = 0; j < textureUrl.length; j++) {
      if (i !== j) {
        const ball2 = ballsArr[j];
        const distance = ball.position.distanceTo(ball2.position);
        const minDistance = 2 * ballRad;
        // Check if balls collide
        if (distance < minDistance) {

          // Calculate the minimum translation distance to avoid overlapping positions
          const overlap = (minDistance - distance) / 2;
          const collisionNormal = ball.position.clone().sub(ball2.position).normalize();//direction of the collisions
          const correction = collisionNormal.clone().multiplyScalar(overlap);

          // Move balls away from each other
          ball.position.add(correction);
          ball2.position.sub(correction);

          // Elastic collision
          const relativeVelocity = ball.speed.clone().sub(ball2.speed);
          const impulse = 2 * relativeVelocity.dot(collisionNormal) / (1 / ballRad + 1 / ballRad); //momentum conservation

          // Update velocities based on impulse
          const impulseVec = collisionNormal.clone().multiplyScalar(impulse);
          ball.speed.sub(impulseVec.clone().multiplyScalar(1 / ballRad));
          ball2.speed.add(impulseVec.clone().multiplyScalar(1 / ballRad));


          // Reduce speed by 30%
          ball.speed.multiplyScalar(collisionDrop);
          ball2.speed.multiplyScalar(collisionDrop);
        }
      }
    }

    const om = ball.speed.length() / ballRad;
    const axis = planeNormal.clone().cross(ball.speed).normalize();

    const dr = new THREE.Matrix4().makeRotationAxis(axis, om * h);
    ball.mesh.matrix.premultiply(dr);
    ball.mesh.matrix.setPosition(ball.position);
  }

  controls.update();
  renderer.render(scene, camera);
}
render();


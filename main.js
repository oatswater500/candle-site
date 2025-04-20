
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 環境光與點光源
let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
let pointLight = new THREE.PointLight(0xffaa55, 1, 100);
pointLight.position.set(0, 3, 3);
pointLight.visible = false;
scene.add(ambientLight);
scene.add(pointLight);

camera.position.z = 5;

let candle, flame;
let loader = new GLTFLoader();

loader.load('蠟燭.glb', function(gltf) {
  candle = gltf.scene;
  scene.add(candle);
  candle.position.y = -1;
});

loader.load('燭火.glb', function(gltf) {
  flame = gltf.scene;
  flame.visible = false;
  scene.add(flame);
  flame.position.y = 0.5;
});

window.addEventListener('click', () => {
  if (flame && candle) {
    flame.visible = true;
    pointLight.visible = true;
    ambientLight.intensity = 0.4;
    document.getElementById('instruction').style.display = 'none';
  }
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

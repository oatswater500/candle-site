
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 環境光與點光源
let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
let pointLight = new THREE.PointLight(0xffaa55, 1, 100);
pointLight.position.set(0, 3, 3);
pointLight.visible = false;
scene.add(ambientLight);
scene.add(pointLight);

camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

let candle, flame;
let loader = new GLTFLoader();

loader.load('candle.glb', function(gltf) {
  candle = gltf.scene;
  candle.scale.set(10, 10, 10); // 放大模型
  candle.position.y = -1;
  scene.add(candle);
});

loader.load('flame.glb', function(gltf) {
  flame = gltf.scene;
  flame.scale.set(10, 10, 10); // 放大火焰
  flame.position.y = 0.5;
  flame.visible = false;
  scene.add(flame);
});

window.addEventListener('click', () => {
  if (flame && candle) {
    flame.visible = true;
    pointLight.visible = true;
    ambientLight.intensity = 0.5;
    const instruction = document.getElementById('instruction');
    if (instruction) instruction.style.display = 'none';
  }
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

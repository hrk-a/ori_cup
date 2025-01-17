import * as THREE from 'three';

// サイズ設定
const C_WIDTH = window.innerWidth;
const C_HEIGHT = window.innerHeight;

// シーンとカメラの設定
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, C_WIDTH / C_HEIGHT, 0.1, 1000);
camera.position.z = 5;

// レンダラーの作成
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(C_WIDTH, C_HEIGHT);
renderer.setPixelRatio(window.devicePixelRatio);

// HTML側とキャンバスを結び付け
const canvas = document.getElementById("three-canvas");
canvas.appendChild(renderer.domElement);

// ライトの作成
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(1, 1, 1);
scene.add(dirLight);

// 環境光の作成
const ambLight = new THREE.AmbientLight(0x333333);
scene.add(ambLight);

// プリミティブ形成のオブジェクトを作成
const geometry = new THREE.TorusKnotGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0xEDBEE5 });
const obj001 = new THREE.Mesh(geometry, material);
scene.add(obj001);

// ループする描画部分
function animate() {
    requestAnimationFrame(animate);

    // オブジェクトの位置や向きを動かす
    obj001.rotation.x += 0.01;
    obj001.rotation.y += 0.02;
    obj001.position.y = Math.sin(obj001.rotation.x);

    renderer.render(scene, camera);
}
animate();

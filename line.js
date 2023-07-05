import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

function renderWebGL() {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(100, 100, 100);
  camera.lookAt(0, 0, 0);

  //cube
  const geometry = new THREE.SphereGeometry( 50, 10, 10, 0, Math.PI * 6/4);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);


  //duong x
  const pointX = [];
  pointX.push(new THREE.Vector3(-1000, 0, 0));
  pointX.push(new THREE.Vector3(1000, 0, 0));
  const geometryX = new THREE.BufferGeometry().setFromPoints(pointX);
  const materialX = new THREE.LineBasicMaterial({ color: 0xffffff });
  const lineX = new THREE.Line(geometryX, materialX);
  scene.add(lineX);

  //duong y
  const pointY = [];
  pointY.push(new THREE.Vector3(0, -1000, 0));
  pointY.push(new THREE.Vector3(0, 1000, 0));
  const geometryY = new THREE.BufferGeometry().setFromPoints(pointY);
  const materialY = new THREE.LineBasicMaterial({ color: 0xffffff });
  const lineY = new THREE.Line(geometryY, materialY);
  scene.add(lineY);

  renderer.render(scene, camera);

  //duong z
  const pointZ = [];
  pointZ.push(new THREE.Vector3(0, 0, -1000));
  pointZ.push(new THREE.Vector3(0, 0, 1000));
  const geometryZ = new THREE.BufferGeometry().setFromPoints(pointZ);
  const materialZ = new THREE.LineBasicMaterial({ color: 0xffffff });
  const lineZ = new THREE.Line(geometryZ, materialZ);
  scene.add(lineZ);

  renderer.render(scene, camera);

  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  renderWebGL();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}

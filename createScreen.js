import * as THREE from "three";
import { Color } from "./constant";

let HEIGHT = window.innerHeight;
let WIDTH = window.innerWidth;
const aspectRatio = WIDTH / HEIGHT;

const fieldOfView = 60;
const nearPlane = 1;
const farPlane = 10000;
const cameraPosition = { x: 0, y: 1500, z: 0 };

export default function createScene() {
  const scene = new THREE.Scene();

  scene.fog = new THREE.Fog(Color.sky, 100, 950);

  const camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    //de cho nen canvas trong suot
    alpha: true,
    //khu rang cua
    antialias: true,
  });

  renderer.setSize(WIDTH, HEIGHT);
  //cho phep render do bong
  renderer.shadowMap.enabled = true;

  const container = document.getElementById("world");
  container.appendChild(renderer.domElement);

  function handleWindowResize() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("resize", handleWindowResize, false);

  return { scene, camera, renderer };
}

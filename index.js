import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import createScene from "./createScreen";
import createLights from "./createLights";
import createSea from "./createSea";
import createAxes from "./createAxes";
import createPlane from "./createPlane";
import createSky from "./createSky";
import {normalize} from "./util"

var mousePos={x:0, y:0};

let HEIGHT = window.innerHeight;
let WIDTH = window.innerWidth;

function initWebGl() {
  const { scene, camera, renderer } = createScene();

  createLights(scene);

  createAxes(scene);

  const sea = createSea(scene);
  const sky = createSky(scene);
  const plane = createPlane(scene);

  function loop() {
    // plane.propeller.rotation.x += 0.3;
    sea.spin();
    sky.spin();
    plane.spinPropeller();
    // sky.mesh.rotation.z += .01;

    updatePlane(plane);
    // render the scene
    renderer.render(scene, camera);

    // gọi hàm lặp lại
    requestAnimationFrame(loop);
  }

  document.addEventListener('mousemove', handleMouseMove, false);
  loop();
}

function handleMouseMove(event) {
	var tx = -1 + (event.clientX / WIDTH)*2;

	var ty = 1 - (event.clientY / HEIGHT)*2;
	mousePos = {x:tx, y:ty};

}

function updatePlane(plane){
	var targetX = normalize(mousePos.x, -1, 1, -200, 200);
	var targetY = normalize(mousePos.y, -1, 1, 200, 320);

	// cập nhật vị trí máy bay
	plane.mesh.position.y = targetY;
	plane.mesh.position.x = targetX;
	plane.propeller.rotation.x += 0.3;
}

if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  initWebGl();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}

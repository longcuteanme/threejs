import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import createScene from "./createScreen";
import createLights from "./createLights";
import createSea from "./createSea";
import createAxes from "./createAxes";

function initWebGl() {
  const { scene, camera, renderer } = createScene();

  createLights(scene);

  createAxes(scene);

  const sea = createSea(scene);

  function loop() {
    // airplane.propeller.rotation.x += 0.3;
    sea.spin();
    // sky.mesh.rotation.z += .01;

    // render the scene
    renderer.render(scene, camera);

    // gọi hàm lặp lại
    requestAnimationFrame(loop);
  }

  loop();
}

if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  initWebGl();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}

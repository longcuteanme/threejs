import * as THREE from "three";
import { Color } from "./constant";
import { randomPositive, randomRange } from "./util";

const numberOfCloudRandomMax = 100;
const numberOfCloudRandomMin = 70;
const spinSpeed = 0.0003;

class Sky {
  constructor() {
    this.mesh = new THREE.Object3D();

    // tao may //////////////////////////////////////////////////////
    const numberCloudGroup = randomRange(
      numberOfCloudRandomMin,
      numberOfCloudRandomMax
    );

    const matCloud = new THREE.MeshPhongMaterial({
      color: Color.cloud,
      transparent: true,
      opacity: 0.8,
      shading: THREE.FlatShading,
      shininess: 70,
      // wireframe: true,
    });

    for (let i = 0; i < numberCloudGroup; i++) {
      const numberCloud = randomRange(3, 5);
      const x = randomPositive() * randomRange(0, 500);
      const radius = randomRange(x * x, 250000);
      const z = randomPositive() * Math.sqrt(radius - x * x);
      const y = randomRange(330, 400);
      for (let cloudIndex = 0; cloudIndex < numberCloud; cloudIndex++) {
        const geomCloud = new THREE.DodecahedronGeometry(
          randomRange(15, 20),
          randomRange(1, 2)
        );
        const cloudRotationX = randomRange(0, 2 * Math.PI);
        const cloudRotationY = randomRange(0, 2 * Math.PI);
        const cloudRotationZ = randomRange(0, 2 * Math.PI);

        const cloudItem = new THREE.Mesh(geomCloud, matCloud);

        cloudItem.position.set(
          randomRange(x - 30, x + 30),
          randomRange(y - 30, y + 30),
          randomRange(z - 30, z + 30)
        );
        cloudItem.rotation.set(cloudRotationX, cloudRotationY, cloudRotationZ);
        cloudItem.castShadow = true;
        cloudItem.receiveShadow = true;

        this.mesh.add(cloudItem);
      }
    }
  }

  spin() {
    this.mesh.rotation.y += randomRange(0, spinSpeed, false);
  }
}

export default function createSky(scene) {
  const sky = new Sky();
  scene.add(sky.mesh);
  return sky;
}

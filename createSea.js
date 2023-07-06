import * as THREE from "three";
import { Color } from "./constant";
import { randomPositive, randomRange } from "./util";

const positionY = -350;
const positionZ = 200;

const numberOfIslandRandomMax = 100;
const numberOfIslandRandomMin = 70;
const numberOfCloudRandomMax = 100;
const numberOfCloudRandomMin = 70;
const spinSpeed = 0.0005;

class Sea {
  constructor() {
    this.mesh = new THREE.Object3D();

    // tao bien //////////////////////////////////////////////////////
    const geom = new THREE.TorusGeometry(350, 530, 20, 30, Math.PI * 2);
    geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    const mat = new THREE.MeshPhongMaterial({
      color: Color.sea,
      transparent: true,
      // opacity: 1,
      shading: THREE.FlatShading,
      shininess: 70,
      // wireframe: true,
    });

    const seaSurface = new THREE.Mesh(geom, mat);
    seaSurface.receiveShadow = true;
    seaSurface.position.y = positionY;
    // seaSurface.position.z = positionZ;
    seaSurface.castShadow = true;
    seaSurface.receiveShadow = true;

    this.mesh.add(seaSurface);

    // tao dao //////////////////////////////////////////////////////

    const numberIsland = randomRange(
      numberOfIslandRandomMin,
      numberOfIslandRandomMax
    );

    const matIsland = new THREE.MeshLambertMaterial({ color: Color.island });
    for (let i = 0; i < numberIsland; i++) {
      const geomIsland = new THREE.BoxGeometry(
        randomRange(15, 20),
        randomRange(15, 20),
        randomRange(15, 20)
      );
      const islandRotationX = randomRange(0, 2 * Math.PI);
      const islandRotationY = randomRange(0, 2 * Math.PI);
      const islandRotationZ = randomRange(0, 2 * Math.PI);
      const island = new THREE.Mesh(geomIsland, matIsland);
      const x = randomPositive() * randomRange(0, 300);
      const radius = randomRange(x * x, 90000);
      const z = randomPositive() * Math.sqrt(radius - x * x);
      const y = randomRange(163, 167);
      island.position.set(x, y, z);
      island.rotation.set(islandRotationX, islandRotationY, islandRotationZ);
      island.castShadow = true;
      island.receiveShadow = true;

      this.mesh.add(island);
    }
  }

  spin() {
    this.mesh.rotation.y += spinSpeed;
  }
}

export default function createSea(scene) {
  const sea = new Sea();
  scene.add(sea.mesh);
  return sea;
}

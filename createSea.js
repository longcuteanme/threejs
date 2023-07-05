import * as THREE from "three";
import { Color } from "./constant";
import { randomRange } from "./util";

const positionY = -350;
const positionZ = 200;

const numberOfIslandRandom = 10;
const spinSpeed = 0.002;

class Sea {
  constructor() {
    const geom = new THREE.TorusGeometry(300, 530, 20, 30, Math.PI * 2);
    geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    const mat = new THREE.MeshPhongMaterial({
      color: Color.sea,
      transparent: true,
      // opacity: 1,
      shading: THREE.FlatShading,
      shininess: 70,
      wireframe: true,
    });

    const seaSurface = new THREE.Mesh(geom, mat);
    seaSurface.receiveShadow = true;
    seaSurface.position.y = positionY;
    seaSurface.position.z = positionZ;

    const numberIsland = Math.round(Math.random() * numberOfIslandRandom);
    console.log(numberIsland);

    this.island = [];

    for (let i = 0; i < numberIsland; i++) {
      const islandWidth = randomRange(100, 120);
      const geomIsland = new THREE.BoxGeometry(
        islandWidth,
        islandWidth,
        islandWidth
      );
      const matIsland = new THREE.MeshBasicMaterial({ color: Color.island });
      const island = new THREE.Mesh(geomIsland, matIsland);
      island.position.set(randomRange(-600, 600), 200, randomRange(-600, 600));
      this.island.push(island);
    }

    console.log("island", this.island.length);

    this.seaSurface = seaSurface;
  }

  spin() {
    this.seaSurface.rotation.y += spinSpeed;
    for (const item of this.island) {
      item.rotateY(spinSpeed);
    }
  }
}

export default function createSea(scene) {
  const sea = new Sea();
  scene.add(sea.seaSurface);
  for (const item of sea.island) {
    scene.add(item);
  }
  return sea;
}

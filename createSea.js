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

const textureLoader = new THREE.TextureLoader();

class Sea {
  constructor() {
    this.mesh = new THREE.Object3D();

    // tao bien //////////////////////////////////////////////////////
    const geom = new THREE.TorusGeometry(350, 530, 20, 30, Math.PI * 2);
    geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    const oceanTexture = textureLoader.load("./oceanTexture.jpg");
    const mat = new THREE.MeshPhongMaterial({
      color: Color.sea,
      transparent: true,
      // opacity: 1,
      shading: THREE.FlatShading,
      shininess: 70,
      map: oceanTexture,
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

    const containerTexture = textureLoader.load("./containerTexture.jpg");

    this.island = [];

    const matIsland = new THREE.MeshLambertMaterial({
      color: Color.island,
      map: containerTexture,
    });
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
      const z = randomPositive() * randomRange(150, 350);
      const radius = randomRange(z * z, 122500);
      const x = randomPositive() * Math.sqrt(radius - z * z);
      const y = randomRange(165, 170);
      island.position.set(x, y, z);
      island.rotation.set(islandRotationX, islandRotationY, islandRotationZ);
      island.castShadow = true;
      island.receiveShadow = true;

      this.island.push({ mesh: island, changeNumber: randomRange(500, 1000) });
    }

    for (const item of this.island) {
      this.mesh.add(item.mesh);
    }

    this.change = 0;
  }

  spin() {
    this.mesh.rotation.y += spinSpeed;
    this.change += 1;
    for (const item of this.island) {
      const { mesh, changeNumber } = item;
      if (Math.floor(this.change / changeNumber) % 2 === 0) {
        mesh.rotation.x += 0.0005;
        mesh.rotation.z += 0.0005;
        mesh.rotation.y += 0.0005;
      } else {
        mesh.rotation.x -= 0.0005;
        mesh.rotation.z -= 0.0005;
        mesh.rotation.y -= 0.0005;
      }
    }
  }
}

export default function createSea(scene) {
  const sea = new Sea();
  scene.add(sea.mesh);
  return sea;
}

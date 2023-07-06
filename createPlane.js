import * as THREE from "three";
import { Color } from "./constant";

const planeY = 250;
const planeZ = -200;
const planeX = -300;

class Plane {
  constructor() {
    this.mesh = new THREE.Object3D();

    // this.mesh.add(planeBody);

    // Tạo động cơ
    var geomEngine = new THREE.SphereGeometry(
      41,
      40,
      50,
      0,
      undefined,
      Math.PI * 2
    );
    var matEngine = new THREE.MeshPhongMaterial({
      color: Color.white,
      shading: THREE.FlatShading,
    });
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
    engine.position.x = 35;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    // Tạo than may bay
    var geomBodyPlane = new THREE.CylinderGeometry(10, 40, 180, 20, 20, false);
    var matBodyPlane = new THREE.MeshPhongMaterial({
      color: Color.warmYellow,
      shading: THREE.FlatShading,
    });
    var bodyPlane = new THREE.Mesh(geomBodyPlane, matBodyPlane);
    bodyPlane.position.set(-65, 0, 0);
    bodyPlane.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    bodyPlane.castShadow = true;
    bodyPlane.receiveShadow = true;
    this.mesh.add(bodyPlane);

    // phan canh quat
    var geomSideWing = new THREE.BoxGeometry(40, 8, 180, 1, 1, 1);
    var matSideWing = new THREE.MeshPhongMaterial({
      color: Color.warmYellow,
      shading: THREE.FlatShading,
    });
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    //phan duoi may bay
    var geomTailPlane = new THREE.CylinderGeometry(5, 10, 40, 20, 20, false);
    var matTailPlane = new THREE.MeshPhongMaterial({
      color: Color.warmYellow,
      shading: THREE.FlatShading,
    });
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-155, 12, 0);
    tailPlane.rotation.set(Math.PI / 2, -0.5, Math.PI / 2);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    // phần quạt
    var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    var matPropeller = new THREE.MeshPhongMaterial({
      color: Color.brown,
      shading: THREE.FlatShading,
    });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    var geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
    var matBlade = new THREE.MeshPhongMaterial({
      color: Color.brownDark,
      shading: THREE.FlatShading,
    });

    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(80, 0, 0);

    this.mesh.add(this.propeller);
  }

  spinPropeller() {
    this.propeller.rotation.x += 0.3;
  }
}

export default function createPlane(scene) {
  const plane = new Plane();
  plane.mesh.scale.set(0.2, 0.2, 0.2);
  plane.mesh.position.set(planeX, planeY, planeZ);
  scene.add(plane.mesh);
  return plane;
}

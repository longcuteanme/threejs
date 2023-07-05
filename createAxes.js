import * as THREE from "three";

export default function createAxes(scene) {
  //duong x
  const pointX = [];
  pointX.push(new THREE.Vector3(-1000, 0, 0));
  pointX.push(new THREE.Vector3(1000, 0, 0));
  const geometryX = new THREE.BufferGeometry().setFromPoints(pointX);
  const materialX = new THREE.LineDashedMaterial({ color: 0xffffff });
  const lineX = new THREE.Line(geometryX, materialX);
  scene.add(lineX);

  //duong y
  const pointY = [];
  pointY.push(new THREE.Vector3(0, -1000, 0));
  pointY.push(new THREE.Vector3(0, 1000, 0));
  const geometryY = new THREE.BufferGeometry().setFromPoints(pointY);
  const materialY = new THREE.LineDashedMaterial({ color: 0xffffff });
  const lineY = new THREE.Line(geometryY, materialY);
  scene.add(lineY);

  //duong z
  const pointZ = [];
  pointZ.push(new THREE.Vector3(0, 0, -1000));
  pointZ.push(new THREE.Vector3(0, 0, 1000));
  const geometryZ = new THREE.BufferGeometry().setFromPoints(pointZ);
  const materialZ = new THREE.LineDashedMaterial({ color: 0xffffff });
  const lineZ = new THREE.Line(geometryZ, materialZ);
  scene.add(lineZ);
}

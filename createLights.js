import * as THREE from "three";

var hemisphereLight, shadowLight;

export default function createLights(scene) {
  // Nguồn sáng
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

  // Nguồn sáng có hướng tỏa ra từ 1 vị trí nhất định
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

  // Đặt vị trí cho nguồn sáng
  shadowLight.position.set(150, 350, 350);

  // Cho phép phủ bóng
  shadowLight.castShadow = true;

  // cài đặt vùng nhìn thấy của bóng đổ
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;

  // cài đặt độ phân giải của bóng đổ; càng cao càng đẹp,
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;
  shadowLight.intensity = 0.7;

  // thêm vào scene để kích hoạt
  scene.add(hemisphereLight);
  scene.add(shadowLight);
}

const container = document.getElementById("three-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const shapes = [];
for (let i = 0; i < 50; i++) {
  let geometry =
    Math.random() > 0.5
      ? new THREE.BoxGeometry(1, 1, 1)
      : new THREE.SphereGeometry(0.5, 16, 16);
  let material = new THREE.MeshStandardMaterial({
    color: Math.random() > 0.5 ? 0x00eaff : 0xff007c,
    transparent: true,
    opacity: 0.8,
    metalness: 0.6,
    roughness: 0.2,
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20
  );
  mesh.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  scene.add(mesh);
  shapes.push({ mesh, speed: 0.001 + Math.random() * 0.003 });
}

camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);
  shapes.forEach((obj) => {
    obj.mesh.rotation.x += obj.speed;
    obj.mesh.rotation.y += obj.speed;
  });
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

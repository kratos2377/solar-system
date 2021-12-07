import * as THREE from "three";

import Planet from "../components/Planet";
import Rotation from "../components/Rotation";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";

const AddPlanet = (test) => {
  const gui = new GUI();
  const sunGeometry = new THREE.SphereGeometry(8);
  const sunTexture = new THREE.TextureLoader().load("sun.jpeg");
  const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
  const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  const solarSystem = new THREE.Group();
  solarSystem.add(sunMesh);
  test.scene.add(solarSystem);

  const mercury = new Planet(2, 16, "mercury.png");
  const mercuryMesh = mercury.getMesh();
  let mercurySystem = new THREE.Group();
  mercurySystem.add(mercuryMesh);

  const venus = new Planet(3, 32, "venus.jpeg");
  const venusMesh = venus.getMesh();
  let venusSystem = new THREE.Group();
  venusSystem.add(venusMesh);

  const earth = new Planet(4, 48, "earth.jpeg");
  const earthMesh = earth.getMesh();
  let earthSystem = new THREE.Group();
  earthSystem.add(earthMesh);

  const mars = new Planet(3, 64, "mars.jpeg");
  const marsMesh = mars.getMesh();
  let marsSystem = new THREE.Group();
  marsSystem.add(marsMesh);

  solarSystem.add(mercurySystem, venusSystem, earthSystem, marsSystem);

  const mercuryRotation = new Rotation(mercuryMesh);
  const mercuryRotationMesh = mercuryRotation.getMesh();
  mercurySystem.add(mercuryRotationMesh);
  const venusRotation = new Rotation(venusMesh);
  const venusRotationMesh = venusRotation.getMesh();
  venusSystem.add(venusRotationMesh);
  const earthRotation = new Rotation(earthMesh);
  const earthRotationMesh = earthRotation.getMesh();
  earthSystem.add(earthRotationMesh);
  const marsRotation = new Rotation(marsMesh);
  const marsRotationMesh = marsRotation.getMesh();
  marsSystem.add(marsRotationMesh);

  // NOTE: Add solar system mesh GUI.

  const solarSystemGui = gui.addFolder("solar system");
  solarSystemGui.add(mercuryRotationMesh, "visible").name("mercury").listen();
  solarSystemGui.add(venusRotationMesh, "visible").name("venus").listen();
  solarSystemGui.add(earthRotationMesh, "visible").name("earth").listen();
  solarSystemGui.add(marsRotationMesh, "visible").name("mars").listen();

  // NOTE: Animate solar system at 60fps.
  const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);

  const animate = () => {
    sunMesh.rotation.y += 0.001;
    mercurySystem.rotation.y += EARTH_YEAR * 4;
    venusSystem.rotation.y += EARTH_YEAR * 2;
    earthSystem.rotation.y += EARTH_YEAR;
    marsSystem.rotation.y += EARTH_YEAR * 0.5;
    requestAnimationFrame(animate);
  };

  animate();
};

export default AddPlanet;

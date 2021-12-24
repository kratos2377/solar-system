import * as THREE from "three";
import React, { useState } from "react";
import Planet from "../components/Planet";
import Rotation from "../components/Rotation";
// import starTexture from "./assets/textures/particles/5.png";
const AddPlanet = (test) => {
  // const gui = new GUI();
  const EARTH_RADIUS = 6;
  const DISTANCE_FROM_EARTH = 90;

  const ambientLight = new THREE.AmbientLight(0x333333);
  test.scene.add(ambientLight);
  // const cubeTextureLoader = new THREE.CubeTextureLoader();
  // test.scene.background = cubeTextureLoader.load([
  //   "starTexture.jpeg",
  //   "starTexture.jpeg",
  //   "starTexture.jpeg",
  //   "starTexture.jpeg",
  //   "starTexture.jpeg",
  //   "starTexture.jpeg",
  // ]);

  // cubeTextureLoader.name = "space-background";

  //Soalr-System-Initiate
  const sunGeometry = new THREE.SphereGeometry(26);
  const sunTexture = new THREE.TextureLoader().load("sun.jpeg");
  const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
  const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  const solarSystem = new THREE.Group();
  solarSystem.add(sunMesh);
  solarSystem.name = "solar-system";
  test.scene.add(solarSystem);
  test.camera.position.z = 1200;
  const mercury = new Planet(
    Math.floor(0.383 * EARTH_RADIUS),
    Math.floor(0.387 * DISTANCE_FROM_EARTH),
    "mercury.png"
  );
  const mercuryMesh = mercury.getMesh();
  let mercurySystem = new THREE.Group();
  mercurySystem.add(mercuryMesh);

  const venus = new Planet(
    Math.floor(0.949 * EARTH_RADIUS),
    Math.floor(0.523 * DISTANCE_FROM_EARTH),
    "venus.jpeg"
  );
  const venusMesh = venus.getMesh();
  let venusSystem = new THREE.Group();
  venusSystem.add(venusMesh);

  const earth = new Planet(
    EARTH_RADIUS,
    Math.floor(0.723 * DISTANCE_FROM_EARTH),
    "earth.jpeg"
  );
  const earthMesh = earth.getMesh();
  let earthSystem = new THREE.Group();
  earthSystem.add(earthMesh);

  const mars = new Planet(
    Math.floor(0.532 * EARTH_RADIUS),
    Math.floor(0.9 * DISTANCE_FROM_EARTH),
    "mars.jpeg"
  );
  const marsMesh = mars.getMesh();
  let marsSystem = new THREE.Group();
  marsSystem.add(marsMesh);

  console.log(mars);
  console.log(marsSystem);

  const jupiter = new Planet(
    Math.floor(2.21 * EARTH_RADIUS),
    Math.floor(1.23 * DISTANCE_FROM_EARTH),
    "jupiter.jpg"
  );
  const jupiterMesh = jupiter.getMesh();
  let jupiterSystem = new THREE.Group();
  jupiterSystem.add(jupiterMesh);

  const saturn = new Planet(
    Math.floor(1.45 * EARTH_RADIUS),
    Math.floor(1.53 * DISTANCE_FROM_EARTH),
    "saturn.jpg"
  );
  const saturnMesh = saturn.getMesh();
  let saturnSystem = new THREE.Group();
  saturnSystem.add(saturnMesh);

  const uranus = new Planet(
    Math.floor(1.12 * EARTH_RADIUS),
    Math.floor(1.75 * DISTANCE_FROM_EARTH),
    "uranus.jpg"
  );
  const uranusMesh = uranus.getMesh();
  let uranusSystem = new THREE.Group();
  uranusSystem.add(uranusMesh);

  const neptune = new Planet(
    Math.floor(1.2 * EARTH_RADIUS),
    Math.floor(1.92 * DISTANCE_FROM_EARTH),
    "neptune.jpg"
  );
  const neptuneMesh = neptune.getMesh();
  let neptuneSystem = new THREE.Group();
  neptuneSystem.add(neptuneMesh);

  solarSystem.add(
    mercurySystem,
    venusSystem,
    earthSystem,
    marsSystem,
    jupiterSystem,
    saturnSystem,
    uranusSystem,
    neptuneSystem
  );

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
  const jupiterRotation = new Rotation(jupiterMesh);
  const jupiterRotationMesh = jupiterRotation.getMesh();
  jupiterSystem.add(jupiterRotationMesh);

  //Saturn
  const saturnRotation = new Rotation(saturnMesh);
  const saturnRotationMesh = saturnRotation.getMesh();
  saturnSystem.add(saturnRotationMesh);

  //Uranus
  const uranusRotation = new Rotation(uranusMesh);
  const uranusRotationMesh = uranusRotation.getMesh();
  uranusSystem.add(uranusRotationMesh);

  //Neptune

  const neptuneTotation = new Rotation(neptuneMesh);
  const neptuneRotationMesh = neptuneTotation.getMesh();
  neptuneSystem.add(neptuneRotationMesh);

  // NOTE: Add solar system mesh GUI.

  // const solarSystemGui = gui.addFolder("solar system");
  // solarSystemGui.add(mercuryRotationMesh, "visible").name("mercury").listen();
  // solarSystemGui.add(venusRotationMesh, "visible").name("venus").listen();
  // solarSystemGui.add(earthRotationMesh, "visible").name("earth").listen();
  // solarSystemGui.add(marsRotationMesh, "visible").name("mars").listen();

  // NOTE: Animate solar system at 60fps.
  const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);

  const animate = () => {
    sunMesh.rotation.y += 0.001;
    mercurySystem.rotation.y += EARTH_YEAR * 4.15;
    venusSystem.rotation.y += EARTH_YEAR * 1.62;
    earthSystem.rotation.y += EARTH_YEAR;
    marsSystem.rotation.y += EARTH_YEAR * 0.93;
    jupiterSystem.rotation.y += EARTH_YEAR * 0.84;
    saturnSystem.rotation.y += EARTH_YEAR * 0.34;
    uranusSystem.rotation.y += EARTH_YEAR * 0.15;
    neptuneSystem.rotation.y += EARTH_YEAR * 0.1;

    requestAnimationFrame(animate);
  };

  animate();
};

export default AddPlanet;

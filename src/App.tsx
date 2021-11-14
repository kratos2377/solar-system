import React, { useState } from "react";
import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "./components/SceneInit";
import Planet from "./components/Planet";
import Rotation from "./components/Rotation";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import "./App.css";

function App() {
  const [build, setBuild] = useState(false);

  function change() {
    setBuild(true);
  }

  useEffect(() => {
    // TODO: Understand this code later.
    if (build || !build) {
      const gui = new GUI();
      let test = new SceneInit();
      test.initScene();
      test.animate();
      // let star: any;
      // let stars: any;
      // let starGeo = new Geometry();
      // for (let i = 0; i < 6000; i++) {
      //   star = new THREE.Vector3(
      //     Math.random() * 600 - 300,
      //     Math.random() * 600 - 300,
      //     Math.random() * 600 - 300
      //   );
      //   star.velocity = 0;
      //   star.acceleration = 0.02;
      //   starGeo.vertices.push(star);
      // }

      // let sprite = new THREE.TextureLoader().load("star.png");
      // let starMaterial = new THREE.PointsMaterial({
      //   color: 0xaaaaaa,
      //   size: 0.7,
      //   map: sprite,
      // });

      // let newStar = starGeo.toBufferGeometry();
      // stars = new THREE.Points(newStar, starMaterial);
      // test.scene.add(stars);

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
      solarSystemGui
        .add(mercuryRotationMesh, "visible")
        .name("mercury")
        .listen();
      solarSystemGui.add(venusRotationMesh, "visible").name("venus").listen();
      solarSystemGui.add(earthRotationMesh, "visible").name("earth").listen();
      solarSystemGui.add(marsRotationMesh, "visible").name("mars").listen();

      // NOTE: Animate solar system at 60fps.
      const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);
      const animate = () => {
        if (test.camera.position.z >= 180) {
          test.camera.position.z -= 5;
        }
        sunMesh.rotation.y += 0.001;
        mercurySystem.rotation.y += EARTH_YEAR * 4;
        venusSystem.rotation.y += EARTH_YEAR * 2;
        earthSystem.rotation.y += EARTH_YEAR;
        marsSystem.rotation.y += EARTH_YEAR * 0.5;
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [build]);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id="myThreeJsCanvas" />
      {/* <button onClick={change}>Click here</button> */}
    </div>
  );
}

export default App;

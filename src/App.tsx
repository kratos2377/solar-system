import React, { useRef, useState } from "react";
import { useEffect } from "react";
import SceneInit from "./components/SceneInit";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import "./App.css";
import { Button, ProgressBar } from "react-bootstrap";
import AddPlanet from "./functions/AddPlanet";
import AddGalaxy from "./functions/AddGalaxy";
import starWarp from "./functions/star-warp";

function App() {
  const [build, setBuild] = useState(true);
  const [cameraPosChange, setCameraPos] = useState(true);
  const [mode, setMode] = useState("Solar-System");
  const [progress, setProgress] = useState(0);
  const [clicked, setClicked] = useState(false);
  let count = 1;
  function change() {
    setClicked(true);

    setInterval(() => {
      setProgress(20 * count);
      count++;
    }, 900);
    setTimeout(() => {
      setBuild(true);
    }, 5000);
  }

  let test;

  useEffect(() => {
    // TODO: Understand this code later.

    if (build) {
      test = new SceneInit();
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
      console.log("Star-Warp Start");
      //AddPlanet(test);
      //AddGalaxy(test);
      starWarp(test);
      console.log("Star-Warp End");
      const animate = () => {
        if (test.camera.position.z >= 180 && cameraPosChange) {
          test.camera.position.z -= 5;
          setCameraPos(false);
        }

        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [build]);

  // useEffect(() => {
  //   if (mode === "Galaxy") AddGalaxy(test);
  //   else if (mode === "Solar-system") AddPlanet(test);
  // }, [mode]);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <canvas id="myThreeJsCanvas" />
      {/* {!build ? (
        <div>
          <div>
            {!clicked ? <h1>This is our default universe</h1> : <div></div>}
            {!clicked ? <p>Click on the button to explore it</p> : <div></div>}
            <Button onClick={change} variant="outline-primary">
              Click Here
            </Button>
            <ProgressBar animated now={progress} />
          </div>
        </div>
      ) : (
        <div></div>
      )} */}
    </div>
  );
}

export default App;

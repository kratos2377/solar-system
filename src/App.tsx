import React, { useRef, useState } from "react";
import { useEffect } from "react";
import "./App.css";
import {
  Accordion,
  Button,
  Col,
  Container,
  ProgressBar,
  Row,
  Image,
} from "react-bootstrap";
import AddPlanet from "./functions/AddPlanet";
import AddGalaxy from "./functions/AddGalaxy";
import starWarp from "./functions/star-warp";
import Planet from "./components/Planet";
import SolarSystem from "./data/solar-system.json";
import { GiConsoleController, GiGalaxy } from "react-icons/gi";
import { GiSolarSystem } from "react-icons/gi";
import { AiFillCamera } from "react-icons/ai";
import { IconContext } from "react-icons";
import { test } from "./render-components/scene-camera";

function App() {
  const [build, setBuild] = useState(false);
  const [cameraPosChange, setCameraPos] = useState(true);
  const [mode, setMode] = useState<"Solar-System" | "Galaxy" | "Star-System">(
    "Star-System"
  );
  const [progress, setProgress] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [transition, setTransition] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
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

  useEffect(() => {
    // TODO: Understand this code later.

    if (build) {
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

      // AddPlanet(test);
      //AddGalaxy(test);
      starWarp(test);

      const animate = () => {
        if (test.camera.position.z >= 180 && cameraPosChange) {
          test.camera.position.z -= 5;
          setCameraPos(false);
        }

        requestAnimationFrame(animate);
      };
      animate();

      setTimeout(() => {
        transitionFunction("Star-System");
      }, 10000);
    }
  }, [build]);

  // useEffect(() => {
  //   if (mode === "Galaxy") AddGalaxy(test);
  //   else if (mode === "Solar-system") AddPlanet(test);
  // }, [mode]);

  const changeRenderScene = () => {
    if (mode === "Solar-System") {
      setMode("Galaxy");
      setTransition(true);
      transitionFunction("Solar-System");
    } else if (mode === "Galaxy") {
      setTransition(true);
      setMode("Solar-System");
      transitionFunction("Galaxy");
    }
  };

  const transitionFunction = (current: string) => {
    if (current === "Star-System") {
      var starObject = test.scene.getObjectByName("star-lines");
      test.scene.remove(starObject);

      setTimeout(() => {
        AddGalaxy(test);
        setMode("Galaxy");
        setTransition(false);
      }, 2000);
    } else if (current === "Solar-System") {
      var solarObject = test.scene.getObjectByName("solar-system");
      test.scene.remove(solarObject);

      setTimeout(() => {
        starWarp(test);
      }, 1000);

      setTimeout(() => {
        var starObject = test.scene.getObjectByName("star-lines");
        test.scene.remove(starObject);
        AddGalaxy(test);
        setMode("Galaxy");
        setTransition(false);
      }, 3000);
    } else if (mode === "Galaxy") {
      console.log("Scene HEre");
      console.log(test);
      var galaxyObject = test.scene.getObjectByName("Galaxy");
      test.scene.remove(galaxyObject);

      setTimeout(() => {
        starWarp(test);
      }, 1000);

      setTimeout(() => {
        var starObject = test.scene.getObjectByName("star-lines");
        test.scene.remove(starObject);
        AddPlanet(test);
        setMode("Solar-System");
        setTransition(false);
      }, 4000);
    }
  };

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
      {!build ? (
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
        <>
          {mode === "Solar-System" && !showDetails ? (
            <div id="accord">
              <h2 id="menu-title">Planets</h2>
              <Accordion>
                {SolarSystem.planets.map((item, i) => (
                  <Accordion.Item eventKey={i.toString()} id="accord-item">
                    <Accordion.Header>{item.planetName}</Accordion.Header>
                    <Accordion.Body id="accord-text">
                      {item.planetName}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          ) : (
            <div></div>
          )}

          {!transition ? (
            <div id="function-buttons">
              <p></p>
              <Container className="container">
                <Row>
                  <Col xs={6} md={4}>
                    <Button
                      size="lg"
                      className="back-button"
                      onClick={changeRenderScene}
                    >
                      <IconContext.Provider
                        value={{ className: "global-class-name" }}
                      >
                        {mode === "Solar-System" ? (
                          <GiGalaxy size={40} />
                        ) : (
                          <GiSolarSystem size={40} />
                        )}
                      </IconContext.Provider>
                    </Button>
                  </Col>
                  <Col xs={6} md={4}>
                    <Button size="lg" className="back-button">
                      <IconContext.Provider
                        value={{ className: "global-class-name" }}
                      >
                        <AiFillCamera size={40} />
                      </IconContext.Provider>
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}
    </div>
  );
}

export default App;

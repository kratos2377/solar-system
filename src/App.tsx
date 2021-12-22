import React, { useRef, useState } from "react";
import { useEffect } from "react";
import SceneInit from "./components/SceneInit";
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
import { GiGalaxy } from "react-icons/gi";
import { GiSolarSystem } from "react-icons/gi";
import { AiFillCamera } from "react-icons/ai";
import { IconContext } from "react-icons";

function App() {
  const [build, setBuild] = useState(false);
  const [cameraPosChange, setCameraPos] = useState(true);
  const [mode, setMode] = useState<"Solar-System" | "Galaxy">("Solar-System");
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

      AddPlanet(test);
      //AddGalaxy(test);
      //starWarp(test);

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

  const changeRenderScene = () => {
    if (mode === "Solar-System") {
      setMode("Galaxy");
    } else {
      setMode("Solar-System");
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
          {mode === "Solar-System" ? (
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
        </>
      )}
    </div>
  );
}

export default App;

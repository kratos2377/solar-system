import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Points } from "three";

const AddGalaxy = (test) => {
  //   const gui = new GUI({ width: 360, closed: true });

  //texture
  const particleTexture = new THREE.TextureLoader().load("5.png");

  //   const particleTexture = textureLoader.load(
  //     "../assets/textures/particles/5.png"
  //   );

  //   console.log(particleTexture);

  // Canvas
  //   const canvas = document.getElementById("myThreeJsCanvas");

  // Scene
  //   const scene = new THREE.Scene();

  //galaxy
  const parameters = {};
  parameters.count = 557400;
  parameters.size = 0.032;
  parameters.sizeAttenuation = true;
  parameters.radius = 5.35;
  parameters.branches = 10;
  parameters.curve = 1;
  parameters.randomness = 0.4;
  parameters.randomnessPower = 2.2;
  parameters.innerColor = "#ff6030";
  parameters.outerColor = "#1b3984";

  let geometry;
  let material;
  let galaxyPoints;

  const generateGalaxy = () => {
    const startsPositions = new Float32Array(parameters.count * 3);
    const starsColors = new Float32Array(parameters.count * 3);

    const insideColor = new THREE.Color(parameters.innerColor);
    const outsideColor = new THREE.Color(parameters.outerColor);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      const radius = Math.random() * parameters.radius;
      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
      const curveAngle = radius * parameters.curve;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomY =
        (Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius) /
        2;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;

      startsPositions[i3] =
        Math.cos(branchAngle + curveAngle) * radius + randomX;
      startsPositions[i3 + 1] = randomY;
      startsPositions[i3 + 2] =
        Math.sin(branchAngle + curveAngle) * radius + randomZ;

      //color
      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, radius / parameters.radius);

      starsColors[i3 + 0] = mixedColor.r;
      starsColors[i3 + 1] = mixedColor.g;
      starsColors[i3 + 2] = mixedColor.b;
    }

    //remove old galaxy
    // if (geometry || material || galaxyPoints) {
    //   geometry.dispose();
    //   material.dispose();
    //   test.scene.remove(galaxyPoints);
    // }

    geometry = new THREE.BufferGeometry({});
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(startsPositions, 3)
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(starsColors, 3));

    material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: parameters.sizeAttenuation,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      alphaMap: particleTexture,
    });

    galaxyPoints = new THREE.Points(geometry, material);
    console.log(galaxyPoints);
    test.scene.add(galaxyPoints);
  };

  generateGalaxy();

  //add parameters to gui
  //   gui
  //     .add(parameters, "count")
  //     .name("stars")
  //     .min(100)
  //     .max(1000000)
  //     .step(100)
  //     .onFinishChange(generateGalaxy);
  //   gui
  //     .add(parameters, "size")
  //     .name("star size")
  //     .min(0.001)
  //     .max(0.1)
  //     .step(0.001)
  //     .onFinishChange(generateGalaxy);
  //   gui
  //     .add(parameters, "sizeAttenuation")
  //     .name("star perspective")
  //     .onFinishChange(generateGalaxy);
  //   gui
  //     .add(parameters, "radius")
  //     .name("galaxy radius")
  //     .min(0.01)
  //     .max(20)
  //     .step(0.01)
  //     .onFinishChange(generateGalaxy);
  //   gui
  //     .add(parameters, "branches")
  //     .min(2)
  //     .max(20)
  //     .step(1)
  //     .onFinishChange(generateGalaxy);
  //   gui
  //     .add(parameters, "curve")
  //     .min(-5)
  //     .max(5)
  //     .step(0.001)
  //     .onFinishChange(generateGalaxy);
  //   gui
  //     .add(parameters, "randomness")
  //     .min(0)
  //     .max(2)
  //     .step(0.001)
  //     .onFinishChange(generateGalaxy);
  //   gui
  //     .add(parameters, "randomnessPower")
  //     .name("randomness easing")
  //     .min(1)
  //     .max(10)
  //     .step(0.001)
  //     .onFinishChange(generateGalaxy);
  //   gui
  //     .addColor(parameters, "innerColor")
  //     .name("inner color")
  //     .onFinishChange(generateGalaxy);
  //   gui
  //     .addColor(parameters, "outerColor")
  //     .name("outer color")
  //     .onFinishChange(generateGalaxy);

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    test.camera.aspect = sizes.width / sizes.height;
    test.camera.updateProjectionMatrix();

    // Update renderer
    test.renderer.setSize(sizes.width, sizes.height);
    test.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     sizes.width / sizes.height,
  //     0.1,
  //     100
  //   );
  //   test.camera.position.x = 2;
  //   test.camera.position.y = 2.5;
  test.camera.position.z = 15;
  // test.scene.add(test.camera);

  // Controls
  //   const controls = new OrbitControls(camera, canvas);
  //   controls.enableDamping = true;

  /**
   * Renderer
   */
  //   const renderer = new THREE.WebGLRenderer({
  //     canvas: canvas,
  //   });
  test.renderer.setSize(sizes.width, sizes.height);
  test.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // update galaxy
    galaxyPoints.rotation.y = elapsedTime * 0.1;
    galaxyPoints.rotation.z = Math.sin(
      galaxyPoints.rotation.z + elapsedTime * Math.PI * 0.02
    );
    galaxyPoints.rotation.x = Math.cos(
      galaxyPoints.rotation.z + elapsedTime * Math.PI * 0.02
    );

    // Update controls
    // controls.update();

    // Render
    test.renderer.render(test.scene, test.camera);

    // Call tick again on the next frame
    requestAnimationFrame(tick);
  };

  tick();
};

export default AddGalaxy;

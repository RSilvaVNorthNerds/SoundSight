import * as THREE from "three";
import vertexShader from "../../src/shaders/vertex.glsl?raw";
import fragmentShader from "../../src/shaders/fragment.glsl?raw";

interface IUseAudioVisualizer {
  color: number;
  shape: string;
  wireframe: boolean;
  songFile: string;
}

function useAudioVisualizer({
  color,
  shape,
  wireframe,
  songFile,
}: IUseAudioVisualizer) {
  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x242424);

  const VISUALIZER_WIDTH = window.innerWidth;
  const VISUALIZER_HEIGHT = window.innerHeight;

  // Create a camera
  const camera = new THREE.PerspectiveCamera(
    75,
    VISUALIZER_WIDTH / VISUALIZER_HEIGHT,
    0.1,
    1000
  );

  camera.position.set(0, 0, 10);

  // add ambient light
  const light = new THREE.AmbientLight(0xffffff, 5.0);
  scene.add(light);

  // add audio configuration
  const listener = new THREE.AudioListener();
  camera.add(listener);

  const sound = new THREE.Audio(listener);

  const audioLoader = new THREE.AudioLoader();
  audioLoader.load(songFile, function (buffer) {
    sound.setBuffer(buffer);
  });

  const analyser = new THREE.AudioAnalyser(sound, 32);

  const clock = new THREE.Clock();

  // Create a geometry
  const geometry = getShape(shape);

  const uniforms = {
    u_time: { value: 0.8 },
    u_frequency: { value: 0.003 },
    u_color: { value: new THREE.Color(color) },
  };

  // Create a material
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });

  // Create a mesh
  const sphereMesh = new THREE.Mesh(geometry, material);

  sphereMesh.castShadow = true;

  sphereMesh.material.wireframe = wireframe;
  // Add the mesh to the scene
  scene.add(sphereMesh);

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    "sunset.jpg",
    (texture) => {
      console.log("Texture loaded successfully");

      const backgroundGeometry = new THREE.PlaneGeometry(60, 40, 20);
      const backgroundMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });

      const backgroundMesh = new THREE.Mesh(
        backgroundGeometry,
        backgroundMaterial
      );

      backgroundMesh.position.set(0, 0, -10);
      backgroundMesh.rotation.set(0, 0, 0);
      backgroundMesh.receiveShadow = true;

      scene.add(backgroundMesh);

      animate();
    },
    undefined,
    (error) => {
      console.error("Error loading texture:", error);
    }
  );

  // Create a renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(VISUALIZER_WIDTH, VISUALIZER_HEIGHT);

  // Animation loop
  const animate = () => {
    camera.lookAt(scene.position);
    uniforms.u_time.value = clock.getElapsedTime();

    let frequency = analyser.getAverageFrequency();

    // Apply a scaling function to emphasize higher frequencies
    frequency = Math.pow(frequency, 1.4);

    // Update the uniform with the scaled frequency
    uniforms.u_frequency.value = frequency;

    sphereMesh.rotation.x += 0.001;
    sphereMesh.rotation.y += 0.001;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  return {
    animate,
    renderer,
    sound,
  };
}

function getShape(name: string) {
  switch (name) {
    case "Icosahedron":
      return new THREE.IcosahedronGeometry(3, 25);
    case "Sphere":
      return new THREE.SphereGeometry(3, 25);
    case "Cube":
      return new THREE.BoxGeometry(3, 3, 3, 25, 25, 25);
  }
}

export default useAudioVisualizer;

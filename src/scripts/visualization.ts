import * as THREE from "three";
import vertexShader from "../shaders/vertex.glsl?raw";
import fragmentShader from "../shaders/fragment.glsl?raw";

function useAudioVisualizer() {
  // Create a scene
  const scene = new THREE.Scene();

  const VISUALIZER_WIDTH = 800;
  const VISUALIZER_HEIGHT = 600;

  // Create a camera
  const camera = new THREE.PerspectiveCamera(
    75,
    VISUALIZER_WIDTH / VISUALIZER_HEIGHT,
    0.1,
    1000
  );

  camera.position.z = 5;
  camera.position.y = 5;
  camera.rotation.x = -Math.PI / 4;

  // add audio configuration
  const listener = new THREE.AudioListener();
  camera.add(listener);

  const sound = new THREE.Audio(listener);

  const audioLoader = new THREE.AudioLoader();
  audioLoader.load("edm.mp3", function (buffer) {
    sound.setBuffer(buffer);
    window.addEventListener("click", function () {
      sound.play();
    });
  });

  const analyser = new THREE.AudioAnalyser(sound, 32);

  const clock = new THREE.Clock();

  // Create a geometry
  const geometry = new THREE.IcosahedronGeometry(3, 30);

  const uniforms = {
    u_time: { type: "f", value: 0.0 },
    u_frequency: { type: "f", value: 0.0 },
    u_red: { type: "f", value: 1.0 },
    u_green: { type: "f", value: 1.0 },
    u_blue: { type: "f", value: 1.0 },
  };

  // Create a material
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });

  // Create a mesh
  const sphereMesh = new THREE.Mesh(geometry, material);

  sphereMesh.material.wireframe = true;
  // Add the mesh to the scene
  scene.add(sphereMesh);

  // Create a renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(VISUALIZER_WIDTH, VISUALIZER_HEIGHT);

  return {
    renderer,
    scene,
    camera,
    uniforms,
    analyser,
    clock,
  };
}

export default useAudioVisualizer;

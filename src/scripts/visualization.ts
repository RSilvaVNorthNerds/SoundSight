import * as THREE from "three";
import vertexShader from "../shaders/vertex.glsl?raw";
import fragmentShader from "../shaders/fragment.glsl?raw";

interface IUseAudioVisualizer {
  color: number;
  shape: string;
  wireframe: boolean;
}

function useAudioVisualizer({ color, shape, wireframe }: IUseAudioVisualizer) {
  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x242424);

  const VISUALIZER_WIDTH = 800;
  const VISUALIZER_HEIGHT = 600;

  // Create a camera
  const camera = new THREE.PerspectiveCamera(
    75,
    VISUALIZER_WIDTH / VISUALIZER_HEIGHT,
    0.1,
    1000
  );

  camera.position.set(5, 5, 2);

  // add audio configuration
  const listener = new THREE.AudioListener();
  camera.add(listener);

  const sound = new THREE.Audio(listener);

  const audioLoader = new THREE.AudioLoader();
  audioLoader.load("phonk.mp3", function (buffer) {
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

  sphereMesh.material.wireframe = wireframe;
  // Add the mesh to the scene
  scene.add(sphereMesh);

  // Create a renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(VISUALIZER_WIDTH, VISUALIZER_HEIGHT);

  console.error("renderer");

  // Animation loop
  const animate = () => {
    camera.lookAt(scene.position);
    uniforms.u_time.value = clock.getElapsedTime();
    uniforms.u_frequency.value = analyser.getAverageFrequency();

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
  }
}

export default useAudioVisualizer;

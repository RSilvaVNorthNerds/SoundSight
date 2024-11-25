import { useEffect, useRef } from "react";
import useAudioVisualizer from "../scripts/visualization";

function Visualization() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { scene, camera, renderer, uniforms, analyser, clock, sphereMesh } =
    useAudioVisualizer();

  useEffect(() => {
    // Append the renderer's DOM element to the mountRef
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

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
    animate();

    // Cleanup on unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [camera, renderer, scene]);

  return <div ref={mountRef}></div>;
}

export default Visualization;

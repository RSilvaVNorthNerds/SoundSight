import { useEffect, useRef } from "react";
import useAudioVisualizer from "../scripts/visualization";

function Visualization() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { animate, renderer } = useAudioVisualizer();

  useEffect(() => {
    // Append the renderer's DOM element to the mountRef
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    animate();

    // Cleanup on unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [renderer, animate]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div ref={mountRef}></div>
      <div className="audio-controls">
        <button>Start/Pause</button>
      </div>
    </div>
  );
}

export default Visualization;

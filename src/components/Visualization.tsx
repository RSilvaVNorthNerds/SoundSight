import { useEffect, useRef, useState } from "react";
import useAudioVisualizer from "../scripts/visualization";

function Visualization() {
  const [controls, setControls] = useState({
    color: 0x00008b,
    shape: "Icosahedron",
    wireframe: true,
  });
  const mountRef = useRef<HTMLDivElement>(null);
  const { animate, renderer, sound } = useAudioVisualizer(controls);

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
  }, [renderer, animate, sound, controls]);

  const handleStartPause = () => {
    if (sound.isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
  };

  const handleColorChange = (color: string) => {
    const intColor = parseInt(color);
    setControls((prev) => ({ ...prev, color: intColor }));
  };

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
        <label htmlFor="color">Color: </label>
        <select
          onChange={(event) => {
            handleColorChange(event.target.value);
          }}
        >
          <option value="0x00008b">Blue</option>
          <option value="0x8b0000">Red</option>
          <option value="0x008b00">Green</option>
        </select>
        <button onClick={handleStartPause}>Start/Pause</button>
      </div>
    </div>
  );
}

export default Visualization;

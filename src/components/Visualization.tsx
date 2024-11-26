import { useEffect, useRef, useState } from "react";
import useAudioVisualizer from "../../public/scripts/visualization";
import "../../public/styles/visualization.css";
import FilterControls from "./FilterControls";

function Visualization() {
  const [controls, setControls] = useState({
    color: 0x00008b,
    shape: "Icosahedron",
    wireframe: true,
    songFile: "phonk.mp3",
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
      if (sound.isPlaying) {
        sound.stop();
      }
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [renderer, sound, animate]);

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

  const handleShapeChange = (shape: string) => {
    setControls((prev) => ({ ...prev, shape }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setControls((prev) => ({ ...prev, songFile: fileUrl }));
    }
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
      <FilterControls
        handleColorChange={handleColorChange}
        handleFileUpload={handleFileUpload}
        handleShapeChange={handleShapeChange}
        handleStartPause={handleStartPause}
      />
    </div>
  );
}

export default Visualization;

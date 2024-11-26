import { useEffect, useRef, useState } from "react";
import useAudioVisualizer from "../scripts/visualization";

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
      <div
        className="audio-controls"
        style={{
          backgroundColor: "#181818",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        <label htmlFor="color">Color: </label>
        <select
          name="color"
          onChange={(event) => {
            handleColorChange(event.target.value);
          }}
        >
          <option value="0x00008b">Blue</option>
          <option value="0x8b0000">Red</option>
          <option value="0x008b00">Green</option>
        </select>
        <label htmlFor="shape">Shape: </label>
        <select
          name="shape"
          onChange={(event) => {
            handleShapeChange(event.target.value);
          }}
        >
          <option value="Icosahedron">Icosahedron</option>
          <option value="Sphere">Sphere</option>
          <option value="Cube">Cube</option>
        </select>
        <input
          type="file"
          name="file-upload"
          id="file-uploader"
          onChange={handleFileUpload}
          accept=".mp3"
        />

        <button
          style={{ backgroundColor: "#000000" }}
          onClick={handleStartPause}
        >
          Start/Pause
        </button>
      </div>
    </div>
  );
}

export default Visualization;

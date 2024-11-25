import "./App.css";
import * as THREE from "three";
import Visualization from "./components/Visualization";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Visualization />
    </>
  );
}

export default App;

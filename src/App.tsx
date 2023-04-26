import { Popup, Marker, MapContainer, TileLayer, useMap } from "react-leaflet";
import { useState, useRef } from "react";
import "./App.css";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import Navbar from "./components/Navbar";

function App() {
  const currentAlgorithmRef = useRef("Dijkstra's");
  const currentSpeedRef = useRef("Normal");

  return (
    <>
      <Navbar
        currAlgorithmRef={currentAlgorithmRef}
        currSpeedRef={currentSpeedRef}
      ></Navbar>
      <PathfindingVisualizer
        currentAlgorithmRef={currentAlgorithmRef}
        currentSpeedRef={currentSpeedRef}
      ></PathfindingVisualizer>
    </>
  );
}

export default App;

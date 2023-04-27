import { Popup, Marker, MapContainer, TileLayer, useMap } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import "./App.css";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import Navbar from "./components/Navbar";
import Dijkstra from "./pathfinding-algorithms/Dijkstra(Reworked)";
import breadthFirstSearch from "./pathfinding-algorithms/BreadthFirstSearch";
import AStarSearch from "./pathfinding-algorithms/AStar";

function App() {
  const currentAlgorithmRef = useRef("Dijkstra's");
  const currentSpeedRef = useRef("Normal");

  const startNode = useRef<MapNode>();
  const endNode = useRef<MapNode>();

  const [shortestPathNodes, setShortestPathNodes] = useState<MapNode[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<MapNode[]>([]);

  const runAlgorithm = async (
    sourceNode: MapNode,
    endNode: MapNode,
    algorithm: string
  ) => {
    let results: MapNode[][] = [[], []];

    if (algorithm === "Dijkstra's") {
      results = Dijkstra(sourceNode, endNode);
    } else if (algorithm === "Breadth-First Search") {
      results = breadthFirstSearch(sourceNode, endNode);
    } else if (algorithm === "A* Search") {
      results = AStarSearch(sourceNode, endNode);
    }

    setShortestPathNodes(results[0]);
    setVisitedNodes(results[1]);
  };

  const visualizeFunction = async () => {
    if (startNode.current !== undefined && endNode.current !== undefined) {
      runAlgorithm(
        startNode.current,
        endNode.current,
        currentAlgorithmRef.current
      );
    }
  };

  return (
    <>
      <Navbar
        currAlgorithmRef={currentAlgorithmRef}
        currSpeedRef={currentSpeedRef}
        visualizeFunction={visualizeFunction}
      ></Navbar>
      <PathfindingVisualizer
        currentAlgorithmRef={currentAlgorithmRef}
        currentSpeedRef={currentSpeedRef}
        shortestPathNodes={shortestPathNodes}
        visitedNodes={visitedNodes}
        startNodeRef={startNode}
        endNodeRef={endNode}
      ></PathfindingVisualizer>
    </>
  );
}

export default App;

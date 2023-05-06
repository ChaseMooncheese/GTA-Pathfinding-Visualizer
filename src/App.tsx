import { useState, useRef, useEffect } from "react";
import "./App.css";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import Navbar from "./components/Navbar";
import Dijkstra from "./pathfinding-algorithms/Dijkstra(Reworked)";
import breadthFirstSearch from "./pathfinding-algorithms/BreadthFirstSearch";
import AStarSearch from "./pathfinding-algorithms/AStar";
import { ClosestNodeFinder } from "./ClosestNodeFinder";

function App() {
  const currentAlgorithmRef = useRef("Dijkstra's");
  const currentSpeedRef = useRef("Normal");

  const isAnimatedRef = useRef(false);

  const startPos = useRef<[number, number]>();
  const endPos = useRef<[number, number]>();

  const [shortestPathNodes, setShortestPathNodes] = useState<MapNode[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<MapNode[]>([]);
  const closestNodeFinder = useRef<ClosestNodeFinder>(null);

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

  const visualizeFunction = () => {
    isAnimatedRef.current = false;
    setShortestPathNodes([]);
    setVisitedNodes([]);
    const startPosition = startPos.current;
    const endPosition = endPos.current;

    if (
      closestNodeFinder.current === null ||
      startPosition === undefined ||
      endPosition === undefined
    ) {
      return;
    }

    const startNode = closestNodeFinder.current.getClosestNode(
      startPosition[0],
      startPosition[1]
    );
    const endNode = closestNodeFinder.current.getClosestNode(
      endPosition[0],
      endPosition[1]
    );

    if (startNode != null && endNode !== null) {
      runAlgorithm(startNode, endNode, currentAlgorithmRef.current);
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
        startPosRef={startPos}
        endPosRef={endPos}
        isAnimatedRef={isAnimatedRef}
        getClosestNodeHandlerRef={closestNodeFinder}
      ></PathfindingVisualizer>
    </>
  );
}

export default App;

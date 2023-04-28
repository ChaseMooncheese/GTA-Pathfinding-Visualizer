import { useEffect, useState } from "react";
import "../types/PathfindingVisualizerTypes";
import SafeNodeData from "../data/safe-nodes.json";
import mapImgURL from "../data/GTAMap.png";
import {
  CircleMarker,
  Circle,
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  SVGOverlay,
} from "react-leaflet";
import NodeData from "../data/nodes.json";
import { LatLngBounds, CRS, LatLng } from "leaflet";
import NodeLayer from "./NodeLayer";
import breadthFirstSearch from "../pathfinding-algorithms/BreadthFirstSearch";
import Navbar from "./Navbar";
import Dijkstra from "../pathfinding-algorithms/Dijkstra(Reworked)";
import AStarSearch from "../pathfinding-algorithms/AStar";
import StartMarker from "./StartMarker";
import EndMarker from "./EndMarker";
import { ClosestNodeFinder } from "../ClosestNodeFinder";

function getLatLngFromCoords(node: MapNode) {
  const x = node.x;
  const y = node.y;
  return new LatLng(y + 4045, x + 5700); //add offsets to make nodes line up with the map
}

//Read data
// @ts-ignore
const nodeData: MapData = NodeData; //Reads the json file
const safeNodeIndexes = SafeNodeData;

const nodes = nodeData.Nodes; //This creates all the node objects. Each node has an empty "edges" property
const edges = nodeData.Edges; //Reads in all the edges

//Initialize nodes with empty edges
nodes.forEach((node) => {
  node.edges = [];
});

//Add edges to node objects
edges.forEach((edge) => {
  const fromNode = nodes[edge.node1];
  const destinationNode = nodes[edge.node2];

  if (fromNode.edges == undefined) {
    fromNode.edges = [];
  }

  const weight = 1; //all weights are 1 for now

  fromNode.edges.push([destinationNode, weight]);
});

//create get closest node handler
const closestNodeHandler = new ClosestNodeFinder(nodes, safeNodeIndexes);

//Create map
const bottomLeft: [number, number] = [0, 0];
const topRight: [number, number] = [12437, 12442];
const bounds = new LatLngBounds(bottomLeft, topRight);

export default function PathfindingVisualizer(props: {
  currentAlgorithmRef: React.MutableRefObject<string>;
  currentSpeedRef: React.MutableRefObject<string>;
  startPosRef: React.MutableRefObject<[number, number] | undefined>;
  endPosRef: React.MutableRefObject<[number, number] | undefined>;
  shortestPathNodes: MapNode[];
  visitedNodes: MapNode[];
  isAnimatedRef: React.MutableRefObject<boolean>;
  getClosestNodeHandlerRef: React.MutableRefObject<ClosestNodeFinder | null>;
}) {
  useEffect(() => {
    props.getClosestNodeHandlerRef.current = closestNodeHandler;
  }, []);
  //props.startNodeRef.current = nodes[0];
  //props.endNodeRef.current = nodes[200];

  return (
    <div>
      <MapContainer
        center={[5000, 5000]}
        bounds={bounds}
        zoom={-2}
        minZoom={-3}
        crs={CRS.Simple}
        preferCanvas={true}
        scrollWheelZoom={true}
        markerZoomAnimation={false}
      >
        <ImageOverlay
          //url="https://www.bragitoff.com/wp-content/uploads/2015/11/GTAV-HD-MAP-satellite.jpg"
          url={mapImgURL}
          bounds={bounds}
        />
        {true && (
          <NodeLayer
            nodes={nodes}
            nodesVisitedInOrder={props.visitedNodes}
            shortestPath={props.shortestPathNodes}
            isAnimatedRef={props.isAnimatedRef}
          />
        )}
        <StartMarker positionRef={props.startPosRef}></StartMarker>
        <EndMarker positionRef={props.endPosRef} />
      </MapContainer>
    </div>
  );
}

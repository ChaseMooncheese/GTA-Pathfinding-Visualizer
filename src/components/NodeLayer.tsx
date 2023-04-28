import { Circle, CircleMarker, LayerGroup } from "react-leaflet";
import "../types/PathfindingVisualizerTypes";
import { LatLng } from "leaflet";
import { useEffect } from "react";
import AnimatedNode from "./AnimatedNode";
import ShortestPathLine from "./ShortestPathLine";

const visitedNodeColor = "red";
const shortestPathNodeColor = "yellow";
const unvisitedNodeColor = "blue";

function getLatLngFromCoords(node: MapNode) {
  const x = node.x;
  const y = node.y;
  return new LatLng(y + 4045, x + 5700); //add offsets to make nodes line up with the map
}

export default function NodeLayer(props: {
  nodes: MapNode[];
  nodesVisitedInOrder: MapNode[];
  shortestPath: MapNode[];
  isAnimatedRef: React.MutableRefObject<boolean>;
}) {
  const visitedNodes = new Set<MapNode>();
  const shortestPathNodes = new Set<MapNode>();

  props.nodesVisitedInOrder.forEach((node, index) => {
    visitedNodes.add(node);
  });

  props.shortestPath.forEach((node, index) => {
    shortestPathNodes.add(node);
  });

  const visuals = props.nodes.map((node, idx) => {
    let color = "blue";
    if (shortestPathNodes.has(node)) {
      color = "yellow";
    } else if (visitedNodes.has(node)) {
      color = "red";
    }

    return (
      <Circle
        key={idx}
        center={getLatLngFromCoords(node)}
        radius={3}
        color={color}
        weight={1}
      />
    );
  });

  const visitedNodesVisuals = props.nodesVisitedInOrder.map((node, index) => {
    return (
      <Circle
        key={index}
        center={getLatLngFromCoords(node)}
        radius={3}
        color={visitedNodeColor}
        weight={1}
      />
    );
  });

  const shortestPathVisuals = props.shortestPath.map((node, index) => {
    return (
      <Circle
        key={index}
        center={getLatLngFromCoords(node)}
        radius={3}
        color={shortestPathNodeColor}
        weight={1}
      />
    );
  });

  const animatedVisuals = props.nodesVisitedInOrder.map((node, index) => {
    return (
      <AnimatedNode
        key={index}
        delay={index * 1}
        position={getLatLngFromCoords(node)}
        nodeType="visited"
        visitedNodesForClearOnUpdate={props.nodesVisitedInOrder}
        isAnimatedRef={props.isAnimatedRef}
      />
    );
  });

  if (animatedVisuals.length === 0) {
    return <></>;
  }

  return (
    <LayerGroup>
      {animatedVisuals}
      <ShortestPathLine
        nodes={props.shortestPath}
        delay={1 * animatedVisuals.length}
        k={Math.random()}
      />
    </LayerGroup>
  );
}

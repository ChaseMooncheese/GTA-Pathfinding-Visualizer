import { Circle, CircleMarker, LayerGroup } from "react-leaflet";
import "../types/PathfindingVisualizerTypes";
import { LatLng } from "leaflet";
import { useEffect } from "react";

function getLatLngFromCoords(node: MapNode) {
  const x = node.x;
  const y = node.y;
  return new LatLng(y + 4045, x + 5700); //add offsets to make nodes line up with the map
}

export default function NodeLayer(props: {
  nodes: MapNode[];
  nodesVisitedInOrder: MapNode[];
}) {
  const visitedNodes = new Set<MapNode>();
  props.nodesVisitedInOrder.forEach((node, index) => {
    visitedNodes.add(node);
  });

  const visuals = props.nodes.map((node, idx) => {
    return (
      <Circle
        key={idx}
        center={getLatLngFromCoords(node)}
        radius={3}
        color={visitedNodes.has(node) ? "red" : "blue"}
        weight={1}
      />
    );
  });
  return <LayerGroup>{visuals}</LayerGroup>;
}

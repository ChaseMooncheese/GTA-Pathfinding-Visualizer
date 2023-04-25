import { Circle, CircleMarker, LayerGroup } from "react-leaflet";
import "../types/PathfindingVisualizerTypes";
import { LatLng } from "leaflet";

function getLatLngFromCoords(node: MapNode) {
  const x = node.x;
  const y = node.y;
  return new LatLng(y + 4045, x + 5700); //add offsets to make nodes line up with the map
}

let closestNode = null;

export default function NodeLayer(props: { nodes: MapNode[] }) {
  const visuals = props.nodes.map((node, idx) => {
    return (
      <CircleMarker
        key={idx}
        center={getLatLngFromCoords(node)}
        radius={3}
        weight={1}
      />
    );
  });
  return <LayerGroup>{visuals}</LayerGroup>;
}

import { useState } from "react";
import "../types/PathfindingVisualizerTypes";
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
} from "react-leaflet";
import NodeData from "../data/nodes.json";
import { LatLngBounds, CRS, LatLng } from "leaflet";

function getLatLngFromCoords(node: MapNode) {
  const x = node.x;
  const y = node.y;
  return new LatLng(y + 4045, x + 5700);
}

//Read data
const nodeData: MapData = NodeData;
const nodes = nodeData.Nodes;
const edges = nodeData.Edges;

//Add edges to node objects
edges.forEach((edge) => {
  const node1 = nodes[edge.node1];
  const node2 = nodes[edge.node2];
  if (node1.edges == undefined) {
    node1.edges = [];
  }
  node1.edges.push([node2, 1]);
});

//Create map
const bottomLeft: [number, number] = [0, 0];
const topRight: [number, number] = [12437, 12442];
const bounds = new LatLngBounds(bottomLeft, topRight);

//Create visual representations of every node
const markers = nodes.map((node, index) => {
  return (
    <Circle
      key={index}
      center={getLatLngFromCoords(node)}
      radius={3}
      weight={0.5}
    />
  );
});

export default function PathfindingVisualizer() {
  return (
    <MapContainer
      center={[5000, 5000]}
      bounds={bounds}
      zoom={-3}
      minZoom={-4}
      crs={CRS.Simple}
      preferCanvas={true}
      scrollWheelZoom={true}
    >
      <ImageOverlay
        //url="https://www.bragitoff.com/wp-content/uploads/2015/11/GTAV-HD-MAP-satellite.jpg"
        url={mapImgURL}
        bounds={bounds}
      />

      <Marker position={bottomLeft} />
      <Marker position={topRight}></Marker>
      <Marker position={[1000, 1000]}></Marker>
      {markers}
    </MapContainer>
  );
}

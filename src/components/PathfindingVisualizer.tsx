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
  return new LatLng(y + 4045, x + 5700); //add offsets to make nodes line up with the map
}

//distance formula calculation
function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

//return the closest node to (x, y)
function getClosestNodeToPoint(x: number, y: number, nodes: MapNode[]) {
  let min = 1000;
  let closeNodes = [];
  let closestNode = null;

  //loop through all nodes and store closeish ones
  for(let i = 0; i < nodes.length; i++){
    if((x + y) - (nodes[i].x + nodes[i].y) < min){
      closeNodes.push(nodes[i]);
    }
  }

  //reset min
  min = Number.MAX_SAFE_INTEGER;
  //if empty return null saves time i think
  if(closeNodes.length === 0){
    return null;
  }
  else{
    //loop through the closeish nodes and now use distance formula to find the closest
    for(let i = 0; i < closeNodes.length; i++){
      if(distance(x,y,closeNodes[i].x,closeNodes[i].y) < min){
        min = distance(x,y,closeNodes[i].x,closeNodes[i].y);
        closestNode = closeNodes[i];
      }
    }
  }

  return closestNode;

}

//Read data
// @ts-ignore
const nodeData: MapData = NodeData; //Reads the json file

const nodes = nodeData.Nodes; //This creates all the node objects. Each node has an empty "edges" property
const edges = nodeData.Edges; //Reads in all the edges

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
      weight={1}
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

      {markers}
    </MapContainer>
  );
}

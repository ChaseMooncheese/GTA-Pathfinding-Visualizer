import "../types/PathfindingVisualizerTypes";
import NodeData from "../data/nodes.json";

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

function Dijkstra(source: MapNode) {
  let s = [source];
  let vs = nodes; //visited nodes
  vs.slice(nodes.indexOf(source), 1); //removes source node from visited
  let d = [];
  let p = [];

  let sourceEdges: [MapNode] = [source.edges[0][0]];
  source.edges.forEach((i) => {
    if (i != source.edges[0]) {
      sourceEdges.push(i[0]);
    }
  });
  for (let i = 0; i < nodes.length; i++) {
    d.push(null);
    p.push(-1);
    if (nodes[i] == source) {
      d[i] = 0;
    } else if (sourceEdges.includes(nodes[i])) {
      d[i] = source.edges[sourceEdges.indexOf(nodes[i])][1];
      p[i] = source;
    }
  }
}

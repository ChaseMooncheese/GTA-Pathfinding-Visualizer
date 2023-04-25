import "../types/PathfindingVisualizerTypes";
import NodeData from "../data/nodes.json";

function Dijkstra(source: MapNode, destination: MapNode) {
  let s = [source]; //visited nodes
  let vs = source.edges;
  let d: number[] = [0];
  let p: (number | MapNode)[] = [-1];

  for (let i = 0; i < vs.length; i++) {
    d.push(vs[i][1]);
    p.push(source);
  }

  while (vs.length != 0) {
    let smallestNode = vs[0][0];
    vs.forEach((i) => {
      if (d[vs.indexOf(i)] > d[vs.indexOf(i)] && !s.includes(i[0])) {
        smallestNode = i[0];
      }
    });
    s.push(smallestNode);
    smallestNode.edges.forEach((i) => {});
  }
}

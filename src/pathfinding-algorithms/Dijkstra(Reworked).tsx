import "../types/PathfindingVisualizerTypes";

function Dijkstra(source: MapNode, destination: MapNode) {
  let s = [source]; //visited nodes
  let vs: MapNode[] = [];
  source.edges.forEach((i) => vs.push(i[0]));
  let d: number[] = [0];
  let p: (number | MapNode)[] = [-1];

  let nodes = [source];

  for (let i = 0; i < vs.length; i++) {
    d.push(source.edges[i][1]);
    nodes.push(vs[i]);
    p.push(source);
  }

  while (vs.length != 0) {
    let smallestNode = vs[0];
    let smallestNodeIndex = 0;
    vs.forEach((i) => {
      if (
        d[nodes.indexOf(smallestNode)] > d[nodes.indexOf(i)] &&
        !s.includes(i)
      ) {
        smallestNode = i;
        smallestNodeIndex = nodes.indexOf(i);
      }
    });
    vs.splice(smallestNodeIndex, 1);
    s.push(smallestNode);
    smallestNode.edges.forEach((i) => {
      if (!vs.includes(i[0]) && !s.includes(i[0])) {
        vs.push(i[0]);
      }
      if (!nodes.includes(i[0])) {
        nodes.push(i[0]);
        d.push(Number.MAX_VALUE);
      }
    });
    smallestNode.edges.forEach((i) => {
      const index = nodes.indexOf(i[0]);
      if (d[index] == undefined) {
        d[index] = d[nodes.indexOf(smallestNode)] + i[1];
        p[index] = smallestNode;
      } else if (
        vs.includes(i[0]) &&
        d[nodes.indexOf(smallestNode)] + i[1] < d[index]
      ) {
        d[index] = d[nodes.indexOf(smallestNode)] + i[1];
        p[index] = smallestNode;
      }
    });
  }

  //path to destination
  let path: (MapNode | number)[] = [destination];
  let nodesTS: (MapNode | number)[] = nodes;
  while (path[0] != source) {
    path.unshift(p[nodesTS.indexOf(path[0])]);
  }

  return path;
}

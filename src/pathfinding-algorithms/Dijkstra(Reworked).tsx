import "../types/PathfindingVisualizerTypes";

export default function Dijkstra(source: MapNode, destination: MapNode) {
  const s = [source]; //visited nodes
  const vs: MapNode[] = []; //non visited nodes (non processed nodes)
  source.edges.forEach((i) => vs.push(i[0])); //adds source's edges to vs to be processed
  const d: number[] = [0]; //weights from source
  const p: (-1 | MapNode)[] = [-1]; //parent node

  const nodes = [source]; //keeps track of all nodes seen so far

  for (let i = 0; i < vs.length; i++) {
    //initializes d, nodes, and p with source edges
    d.push(source.edges[i][1]);
    nodes.push(vs[i]);
    p.push(source);
  }

  while (vs.length != 0) {
    //runs while nodes still need to be processed
    let smallestNode = vs[0];
    let smallestNodeIndex = 0;
    vs.forEach((i) => {
      //finds smallest(lowest weight from source) unprocessed node
      if (d[smallestNodeIndex] > d[nodes.indexOf(i)] && !s.includes(i)) {
        smallestNode = i;
        smallestNodeIndex = nodes.indexOf(i);
      }
    });
    vs.splice(smallestNodeIndex, 1);
    s.push(smallestNode); //removes smalleset node from vs and adds it to s
    if (smallestNode.edges !== undefined) {
      //prevents errors for nodes with no edges
      smallestNode.edges.forEach((i) => {
        //adds new nodes
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
  }

  //path to destination
  const path: MapNode[] = [destination];
  const nodesTS: (MapNode | number)[] = nodes;
  while (path[0] != source) {
    let pNode = p[nodesTS.indexOf(path[0])];
    if (pNode === -1) {
      pNode = source;
    }
    path.unshift(pNode);
  }

  return [path, path];
}

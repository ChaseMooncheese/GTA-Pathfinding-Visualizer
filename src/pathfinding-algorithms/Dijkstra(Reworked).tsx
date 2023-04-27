import "../types/PathfindingVisualizerTypes";

export default function Dijkstra(source: MapNode, destination: MapNode) {
  const s = new Set<MapNode>(); //visited nodes
  s.add(source);
  const vs = new Set<MapNode>(); //non visited nodes (non processed nodes)
  source.edges.forEach((i) => vs.add(i[0])); //adds source's edges to vs to be processed
  const d: number[] = [0]; //weights from source
  const p: (-1 | MapNode)[] = [-1]; //parent node

  const nodes = [source]; //keeps track of all nodes seen so far

  for (let i = 0; i < source.edges.length; i++) {
    //initializes d, nodes, and p with source edges
    d.push(source.edges[i][1]);
    nodes.push(source.edges[i][0]);
    p.push(source);
  }

  let endNodeFound = false;

  while (vs.size != 0 && !endNodeFound) {
    //runs while nodes still need to be processed
    let smallestNode: MapNode = nodes[0];
    let smallestNodeIndex = -1;

    for (let i = 0; i < d.length; i++) {
      //finds smallest d that is in vs
      if (smallestNodeIndex === -1 && vs.has(nodes[i])) {
        smallestNode = nodes[i];
        smallestNodeIndex = i;
      } else if (d[smallestNodeIndex] > d[i] && vs.has(nodes[i])) {
        smallestNode = nodes[i];
        smallestNodeIndex = i;
      }
    }

    if (smallestNode === destination) {
      endNodeFound = true;
      continue;
    }

    vs.delete(smallestNode);
    s.add(smallestNode); //removes smalleset node from vs and adds it to s
    if (smallestNode.edges !== undefined) {
      //prevents errors for nodes with no edges
      smallestNode.edges.forEach((i) => {
        //adds new nodes
        if (!vs.has(i[0]) && !s.has(i[0])) {
          vs.add(i[0]);
        }
        if (!nodes.includes(i[0])) {
          nodes.push(i[0]);
          d.push(Number.MAX_VALUE);
        }
      });
      smallestNode.edges.forEach((i) => {
        const index = nodes.indexOf(i[0]);
        if (d[index] == undefined) {
          d[index] = d[smallestNodeIndex] + i[1];
          p[index] = smallestNode;
        } else if (vs.has(i[0]) && d[smallestNodeIndex] + i[1] < d[index]) {
          d[index] = d[smallestNodeIndex] + i[1];
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

  return [path, Array.from(s.values())];
}

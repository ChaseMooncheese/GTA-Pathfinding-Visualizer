import PriorityQueue from "js-priority-queue";

//value for the chart, holds parent and distance from start
type pairValue = {
  first: MapNode;
  second: number;
};

export default function Dijkstra(startNode: MapNode, endNode: MapNode) {
  const visitedNodes = new Set<MapNode>(); //set to know what is already checked
  const allVisited = []; //visited in order array
  const searchChart = new Map<MapNode, pairValue>(); //unordered map with dijkstras esc chart
  const shortestPath = Array<MapNode>(); //shortest path to return
  const pq = new PriorityQueue({
    //min heap of nodes based on distances
    comparator: (a: MapNode, b: MapNode) => {
      const pairA = searchChart.get(a);
      const pairB = searchChart.get(b);

      if (pairA === undefined || pairB === undefined) {
        return 0;
      }
      return pairA.second - pairB.second;
    },
  });

  pq.queue(startNode); //place starting node in the pq
  searchChart.set(startNode, { first: startNode, second: 0 }); //and in the chart with a weight of 0, its parent doesnt rlly matter

  //as long as pq is not empty
  while (pq.length > 0) {
    let currNode = pq.dequeue(); //remove from pq and store it in the current node
    allVisited.push(currNode); //put current node in the set to mark as visited already

    //if endNode is reached and is at the top of the pq
    if (currNode === endNode) {
      //backtrack from the end node through all the parents in the chart and add the parents to the path array
      while (currNode != startNode) {
        shortestPath.push(currNode);
        currNode = searchChart.get(currNode).first;
      }
      shortestPath.push(currNode);
      //return the shortest path reversed and every node visited in order
      return [shortestPath.reverse(), allVisited];
    }

    //skip if visited
    if (visitedNodes.has(currNode)) {
      continue;
    }
    //add to visited set
    visitedNodes.add(currNode);

    //skip if it doesnt have any edges
    if (currNode.edges === undefined) {
      continue;
    }

    //loop through edges
    for (let i = 0; i < currNode.edges.length; i++) {
      //the cost of the current edge is that edges weight + parent nodes weight
      const cost = currNode.edges[i][1] + searchChart.get(currNode).second;

      //if the neighbor is not yet in the chart (hasnt been checked yet) or if the current cost to it is less then the previous cost to it
      if (
        !searchChart.has(currNode.edges[i][0]) ||
        cost < searchChart.get(currNode.edges[i][0]).second
      ) {
        //update it with the new cost and parent node and put it in pq
        searchChart.set(currNode.edges[i][0], {
          first: currNode,
          second: cost,
        });
        pq.queue(currNode.edges[i][0]);
      }
    }
  }
  //if end node wasnt reached return the empty shortest path and all nodes visited in order
  return [shortestPath, allVisited];
}

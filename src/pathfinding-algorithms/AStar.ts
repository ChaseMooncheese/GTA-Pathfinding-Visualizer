import PriorityQueue from 'js-priority-queue';

//value for the chart, holds parent and distance from start
type pairValue = {
    first: MapNode;
    second: number;
}

export default function AStarSearch(startNode: MapNode, endNode: MapNode){
    const visitedNodes = new Set<MapNode>(); //set to know what is already checked
    const searchChart = new Map<MapNode, pairValue>(); //unordered map with dijkstras esc chart
    const pq = new PriorityQueue({
        comparator: (a: MapNode, b: MapNode) => { 
            const pairA = searchChart.get(a);
            const pairB = searchChart.get(b);
            
            if (pairA=== undefined || pairB === undefined)
            {
              return 0;
            }
            return pairA.second - pairB.second;
        }
    });

    pq.queue(startNode);

}

function absDistance(currNode: MapNode, endNode: MapNode){
    return Math.abs(currNode.x - endNode.x) + Math.abs(currNode.y - endNode.y);
}

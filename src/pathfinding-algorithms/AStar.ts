import PriorityQueue from 'js-priority-queue';

//value for the chart, holds parent and distance from start
type pairValue = {
    first: MapNode;
    second: number;
}

export default function AStarSearch(startNode: MapNode, endNode: MapNode){

    const visitedNodes = new Set<MapNode>(); //set to know what is already checked
    const allVisited = [];
    const searchChart = new Map<MapNode, pairValue>(); //unordered map with dijkstras esc chart
    const pq = new PriorityQueue({
        comparator: (a: MapNode, b: MapNode) => { 
            const pairA = searchChart.get(a);
            const pairB = searchChart.get(b);
            
            if (pairA === undefined || pairB === undefined)
            {
              return 0;
            }
            return pairA.second - pairB.second;
        }
    });

    pq.queue(startNode);
    searchChart.set(startNode,{first: startNode, second: 0});

    while(pq.length > 0){
        let currNode = pq.dequeue();
        allVisited.push(currNode);
        
        if(currNode === endNode){
            const shortestPath = [];

            while(currNode != startNode){
                shortestPath.push(currNode);
                currNode = searchChart.get(currNode).first;
            }

            shortestPath.push(currNode);
            return [shortestPath.reverse(), allVisited];

        }

        if(visitedNodes.has(currNode)){
            continue;
        }

        visitedNodes.add(currNode);

        if(currNode.edges === undefined){
            continue;
        }

        for(let i = 0; i < currNode.edges.length; i++){
            //the cost of the current edge is that edges weight + parent nodes weight + the manhattan distance from the edge node to the end
            const cost = currNode.edges[i][1] + searchChart.get(currNode).second + manhattanDistance(currNode.edges[i][0], endNode);

            //if the neighbor is not yet in the chart (hasnt been checked yet) or if the current cost to it is less then the previous cost to it
            if(!searchChart.has(currNode.edges[i][0]) || cost < searchChart.get(currNode.edges[i][0]).second){
                //update it with the new cost and parent node and put it in pq
                searchChart.set(currNode.edges[i][0], {first: currNode, second: cost});
                pq.queue(currNode.edges[i][0]);
            }

        }

    }

    return [null, allVisited];
}

function manhattanDistance(currNode: MapNode, endNode: MapNode){
    return Math.abs(currNode.x - endNode.x) + Math.abs(currNode.y - endNode.y);
}


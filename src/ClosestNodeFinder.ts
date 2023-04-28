import { LatLng } from "leaflet";

export class ClosestNodeFinder {
    safeNodes: MapNode[];

    constructor(nodes: MapNode[], safeNodeIndexes: number[]){
        this.safeNodes = [];
        safeNodeIndexes.forEach( index => {
            this.safeNodes.push(nodes[index]);
        })
    }

  private convertLatLngToXY(loc: LatLng){
    const x = loc.lng - 5700;
    const y = loc.lat - 4045;
    return [x, y];
  }

    //distance formula calculation
  private distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  
  //return the closest node to (x, y)
    private getClosestNodeToPoint(x: number, y: number, nodes: MapNode[]) {
    let min = 1000;
    let closeNodes = [];
    let closestNode = null;
  
    //loop through all nodes and store closeish ones
    for (let i = 0; i < nodes.length; i++) {
      if (Math.abs(x - nodes[i].x) + Math.abs(y - nodes[i].y) < min) {
        //if (x + y - (nodes[i].x + nodes[i].y) < min) {
        closeNodes.push(nodes[i]);
      }
    }
  
    //reset min
    min = Number.MAX_SAFE_INTEGER;
    //if empty return null saves time i think
    if (closeNodes.length === 0) {
      return null;
    } else {
      //loop through the closeish nodes and now use distance formula to find the closest
      for (let i = 0; i < closeNodes.length; i++) {
        if (this.distance(x, y, closeNodes[i].x, closeNodes[i].y) < min) {
          min = this.distance(x, y, closeNodes[i].x, closeNodes[i].y);
          closestNode = closeNodes[i];
        }
      }
    }
  
    return closestNode;
  }

  getClosestNode(x: number, y: number){
    const loc = new LatLng(y, x);
    const [x2, y2] = this.convertLatLngToXY(loc);
    return this.getClosestNodeToPoint(x2, y2, this.safeNodes);
  }
}
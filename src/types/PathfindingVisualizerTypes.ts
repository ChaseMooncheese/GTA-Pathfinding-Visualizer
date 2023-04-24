type MapNode = {
    x: number;
    y: number;
    edges: Array<[MapNode, number]> //The number is the weight of the edge
}

type MapEdge = {    //Just used for data parsing
    node1: number;
    node2: number;
}

type MapData = {    //Just used for data parsing
    Nodes: MapNode[];
    Edges: MapEdge[];
}
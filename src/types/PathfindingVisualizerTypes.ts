type MapNode = {
    x: number;
    y: number;
    edges: Array<[MapNode, number]>
}

type MapEdge = {
    node1: number;
    node2: number;
}

type MapData = {
    Nodes: MapNode[];
    Edges: MapEdge[];
}
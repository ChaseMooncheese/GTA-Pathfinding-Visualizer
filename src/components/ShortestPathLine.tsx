import { LatLng } from "leaflet";
import { useState, useEffect } from "react";
import { Polyline } from "react-leaflet";

function getLatLngFromCoords(node: MapNode) {
  const x = node.x;
  const y = node.y;
  return new LatLng(y + 4045, x + 5700); //add offsets to make nodes line up with the map
}

const lineOptions = {
  color: "purple",
  weight: 10,
};

export default function ShortestPathLine(props: {
  nodes: MapNode[];
  delay: number;
  k: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const positions = props.nodes.map((node) => {
    const pos = getLatLngFromCoords(node);
    return pos;
  });

  console.log(props.delay);
  console.log(isVisible);

  useEffect(() => {
    setIsVisible(false);
  }, [props.k]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      console.log("setting now");
    }, props.delay);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {isVisible && (
        <Polyline pathOptions={lineOptions} positions={positions} />
      )}
    </>
  );
}

import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { Circle } from "react-leaflet";

const radius = 3;
const weight = 1;

export default function AnimatedNode(props: {
  delay: number;
  position: LatLng;
  nodeType: "shortestPath" | "visited";
  visitedNodesForClearOnUpdate: MapNode[];
  isAnimatedRef: React.MutableRefObject<boolean>;
}) {
  const [currentRadius, setCurrentRadius] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const color = props.nodeType === "shortestPath" ? "yellow" : "red";

  if (!props.isAnimatedRef.current && isVisible) {
    setIsVisible(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      props.isAnimatedRef.current = true;
      setIsVisible(true);
    }, props.delay);
    return () => clearTimeout(timer);
  });

  return isVisible ? (
    <Circle
      center={props.position}
      radius={currentRadius}
      color={color}
      weight={1}
    />
  ) : (
    <></>
  );
}

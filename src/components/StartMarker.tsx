import { LatLng } from "leaflet";
import * as L from "leaflet";
import { Marker } from "react-leaflet";
import { useState, useMemo, useRef, useEffect } from "react";
import startIcon from "../data/cursor-purple.png";

function getIcon() {
  const icon = L.icon({
    iconUrl: startIcon,
    iconSize: [25, 25],
  });
  return icon;
}

const initialPosition = new LatLng(5000, 3000);

export default function StartMarker(props: {
  positionRef: React.MutableRefObject<[number, number] | undefined>;
}) {
  const [position, setPosition] = useState(initialPosition);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    let p: LatLng;
    if (markerRef.current !== null) {
      p = markerRef.current.getLatLng();
    } else {
      p = initialPosition;
    }
    props.positionRef.current = [p.lng, p.lat];
  }, []);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          const p = marker.getLatLng();
          props.positionRef.current = [p.lng, p.lat];
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable={true}
      icon={getIcon()}
      //icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
      position={initialPosition}
      ref={markerRef}
      eventHandlers={eventHandlers}
    />
  );
}

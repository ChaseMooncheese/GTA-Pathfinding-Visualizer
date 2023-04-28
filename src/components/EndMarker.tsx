import { LatLng } from "leaflet";
import { Marker } from "react-leaflet";
import { useState, useMemo, useRef, useEffect } from "react";

const initialPosition = new LatLng(3000, 5000);

export default function EndMarker(props: {
  positionRef: React.MutableRefObject<[number, number] | undefined>;
}) {
  const markerRef = useRef<any>(null);
  const [position, setPosition] = useState(initialPosition);

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
      position={initialPosition}
      ref={markerRef}
      eventHandlers={eventHandlers}
    />
  );
}

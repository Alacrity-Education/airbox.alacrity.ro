"use client";
import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
export default function App() {
  return (
    <div className="relative h-full w-full">
      <Map
        mapboxAccessToken="pk.eyJ1IjoibHVjYXNhaW5lbmNvIiwiYSI6ImNsM2V2YXJ2czA0bDYzam4wMXYycDU0eG0ifQ.p7mkAeKWRHsi3q6pLdMhIQ"
        initialViewState={{
          longitude: 26.10307822178919,
          latitude: 44.438385445388946,
          zoom: 16,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/lucasainenco/clo9pjg5000rp01qxh60taxwj"
      />
    </div>
  );
}

import React, { useState } from "react";
import MapsTemplate from "../components/MapsTemplate";
// import "../Maps.css";
import "../MapboxComponent.css";

const mapStyles = [
  {
    id: "streets-v12",
    name: "Streets",
    styleUrl: "mapbox://styles/mapbox/streets-v12",
  },
  {
    id: "navigation-guidance-night-v4",
    name: "Night",
    styleUrl: "mapbox://styles/mapbox/navigation-guidance-night-v4",
  },
  {
    id: "satellite-v9",
    name: "Satellite",
    styleUrl: "mapbox://styles/mapbox/satellite-v9",
  },
  // Add more map styles here
];

const Maps = () => {
  const [selectedStyle, setSelectedStyle] = useState(mapStyles[0].styleUrl);

  return (
    <div className="maps-container">
      {mapStyles.map((style) => (
        <div key={style.id} onClick={() => setSelectedStyle(style.styleUrl)}>
          <h3>{style.name}</h3>
          <MapsTemplate
            mapStyle={style.styleUrl}
            latitude={52.3752}
            longitude={4.8415}
            zoom={7}
            onZoomChange={() => {}}
          />
        </div>
      ))}
    </div>
  );
};

export default Maps;

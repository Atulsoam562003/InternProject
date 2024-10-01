import React, { useEffect, useState, useRef } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../MapboxComponent.css"; // Import the CSS file

const MapsTemplate = ({
  mapStyle,
  initialLatitude,
  initialLongitude,
  initialZoom,
}) => {
  const [latitude, setLatitude] = useState(initialLatitude || 0);
  const [longitude, setLongitude] = useState(initialLongitude || 0);
  const [zoom, setZoom] = useState(initialZoom || 10);
  const [markerSize, setMarkerSize] = useState(initialZoom * 3.5);
  const [error, setError] = useState(null);

  const mapRef = useRef(null);
  const directionsRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation && (latitude === 0 || longitude === 0)) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    }
  }, [latitude, longitude]);

  const handleMapLoad = () => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();

      if (!directionsRef.current) {
        const directions = new MapboxDirections({
          accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
        });

        map.addControl(directions, "top-left");
        directionsRef.current = directions;
      }
    }
  };

  const handleViewStateChange = ({ viewState }) => {
    setZoom(viewState.zoom);
    setMarkerSize(viewState.zoom * 3.5);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (latitude === 0 || longitude === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="map-card">
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: zoom,
        }}
        style={{ width: "500px", height: "400px" }}
        mapStyle={mapStyle}
        onLoad={handleMapLoad}
        onViewStateChange={handleViewStateChange}
      >
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <LocationOnIcon
            style={{
              fontSize: markerSize,
              color: "red",
            }}
          />
        </Marker>
        <NavigationControl />
      </Map>
    </div>
  );
};

export default MapsTemplate;

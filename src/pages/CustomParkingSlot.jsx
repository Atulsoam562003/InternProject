import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CustomParkingSlot.css";

const CustomParkingSlot = () => {
  const [location, setLocation] = useState("");
  const [availableSpaces, setAvailableSpaces] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [geoInfo, setGeoInfo] = useState(null);

  const navigate = useNavigate();

  const allParkingSpaces = {
    "Bara Bazar": {
      spaces: ["BB1", "BB2", "BB3", "BB4"],
      lat: 23.7275,
      lon: 92.7176,
    },
    Chanmari: {
      spaces: ["CM1", "CM2", "CM3", "CM4"],
      lat: 23.7368,
      lon: 92.7149,
    },
    Zarkawt: {
      spaces: ["ZK1", "ZK2", "ZK3", "ZK4"],
      lat: 23.7389,
      lon: 92.7172,
    },
    Vaivakawn: {
      spaces: ["VV1", "VV2", "VV3", "VV4"],
      lat: 23.7376,
      lon: 92.7264,
    },
    Durtlang: {
      spaces: ["DT1", "DT2", "DT3", "DT4"],
      lat: 23.7568,
      lon: 92.7346,
    },
    Bawngkawn: {
      spaces: ["BK1", "BK2", "BK3", "BK4"],
      lat: 23.7635,
      lon: 92.7333,
    },
    Kulikawn: {
      spaces: ["KK1", "KK2", "KK3", "KK4"],
      lat: 23.7414,
      lon: 92.7143,
    },
    Sairang: {
      spaces: ["SR1", "SR2", "SR3", "SR4"],
      lat: 23.7963,
      lon: 92.7076,
    },
    Ramhlun: {
      spaces: ["RH1", "RH2", "RH3", "RH4"],
      lat: 23.739,
      lon: 92.7141,
    },
    "Aizawl Theological College": {
      spaces: ["ATC1", "ATC2", "ATC3", "ATC4"],
      lat: 23.7371,
      lon: 92.7194,
    },
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setSuggestions(
      Object.keys(allParkingSpaces).filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      )
    );

    if (allParkingSpaces[value]) {
      setAvailableSpaces(allParkingSpaces[value].spaces);
      setGeoInfo({
        lat: allParkingSpaces[value].lat,
        lon: allParkingSpaces[value].lon,
      });
    } else {
      setAvailableSpaces([]);
      setGeoInfo(null);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setAvailableSpaces(allParkingSpaces[suggestion].spaces);
    setGeoInfo({
      lat: allParkingSpaces[suggestion].lat,
      lon: allParkingSpaces[suggestion].lon,
    });
    setSuggestions([]);
  };

  const handleShowOnMapClick = () => {
    navigate("/maps", { state: { location, geoInfo, availableSpaces } });
  };

  return (
    <div className="custom-container">
      <h2 className="custom-title">Custom Parking Slot</h2>
      <div className="form-group">
        <label htmlFor="location">Enter Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={handleLocationChange}
          placeholder="Type your desired location"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {geoInfo && (
        <div className="geo-info">
          <p>Latitude: {geoInfo.lat}</p>
          <p>Longitude: {geoInfo.lon}</p>
        </div>
      )}
      <div className="available-spaces">
        <h3>Available Parking Spaces:</h3>
        {availableSpaces.length > 0 ? (
          <ul>
            {availableSpaces.map((space) => (
              <li key={space}>{space}</li>
            ))}
          </ul>
        ) : (
          <p>No parking spaces available for this location.</p>
        )}
      </div>
      <button className="show-on-map-button" onClick={handleShowOnMapClick}>
        Choose Your Location
      </button>
    </div>
  );
};

export default CustomParkingSlot;

"use client"; // Mark this as a client component

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const ActivityMap = () => {
  const [activityData, setActivityData] = useState({});
  const [activityFilter, setActivityFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [geoData, setGeoData] = useState(null); // State to hold the map data

  // Sample activity data for countries (using ISO codes)
  const sampleActivityData = {
    "US": { name: "United States", level: "high", value: 87 },
    "CA": { name: "Canada", level: "medium", value: 65 },
    "MX": { name: "Mexico", level: "medium", value: 58 },
    "BR": { name: "Brazil", level: "high", value: 92 },
    "AR": { name: "Argentina", level: "low", value: 34 },
    "GB": { name: "United Kingdom", level: "high", value: 84 },
    "FR": { name: "France", level: "medium", value: 62 },
    "DE": { name: "Germany", level: "high", value: 78 },
    "ES": { name: "Spain", level: "medium", value: 55 },
    "IT": { name: "Italy", level: "low", value: 42 },
    "RU": { name: "Russia", level: "medium", value: 60 },
    "CN": { name: "China", level: "high", value: 95 },
    "IN": { name: "India", level: "high", value: 89 },
    "JP": { name: "Japan", level: "medium", value: 67 },
    "AU": { name: "Australia", level: "low", value: 45 },
    "ZA": { name: "South Africa", level: "low", value: 38 },
    "EG": { name: "Egypt", level: "low", value: 30 },
    "NG": { name: "Nigeria", level: "medium", value: 52 },
  };

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setActivityData(sampleActivityData);
      setLoading(false);
    }, 1000);

    // Fetch GeoJSON data for the world map
    fetch(geoUrl)
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error fetching GeoJSON data:", error));
  }, []);

  const getCountryColor = (countryName) => {
    // Find the ISO code corresponding to the country name in sampleActivityData
    const countryData = Object.values(activityData).find((data) => data.name === countryName);
    
    if (!countryData) {
      console.log(`No data for countryName: ${countryName}`);
      return "#e0e0e0"; // Default gray for countries with no data
    }
  
    const { level } = countryData;
  
    console.log(`Country: ${countryName}, Level: ${level}, Filter: ${activityFilter}`);
  
    // Apply the correct color based on the activity level and filter
    if (activityFilter !== "all" && level !== activityFilter) {
      return "#e0e0e0"; // Gray out countries that don't match the filter
    }
  
    switch (level) {
      case "high":
        return "#4CAF50"; // Green for high activity
      case "medium":
        return "#FFC107"; // Yellow for medium activity
      case "low":
        return "#F44336"; // Red for low activity
      default:
        return "#e0e0e0"; // Default gray for unknown or no data
    }
  };
  
  
  
  const getFilteredCountries = () => {
    if (!activityData) return []; // Ensure data is available
    if (activityFilter === "all") {
      return Object.entries(activityData || {});
    }
    return Object.entries(activityData).filter(([_, data]) => data.level === activityFilter);
  };
  

  const [hoveredCountry, setHoveredCountry] = useState(null);

  if (loading || !geoData) {
    return <div className="flex items-center justify-center h-64">Loading map data...</div>;
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Global Activity Map</h2>

      {/* Filter controls */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Filter by Activity Level:</h3>
        <div className="flex space-x-2">
          <button onClick={() => setActivityFilter("all")} className={`px-4 py-2 rounded ${activityFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            All
          </button>
          <button onClick={() => setActivityFilter("high")} className={`px-4 py-2 rounded flex items-center ${activityFilter === "high" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>High
          </button>
          <button onClick={() => setActivityFilter("medium")} className={`px-4 py-2 rounded flex items-center ${activityFilter === "medium" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Medium
          </button>
          <button onClick={() => setActivityFilter("low")} className={`px-4 py-2 rounded flex items-center ${activityFilter === "low" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>Low
          </button>
        </div>
      </div>

      {/* World Map */}
      <div className="w-full h-96 border border-gray-300 rounded-lg overflow-hidden relative bg-blue-50">
        {geoData ? (
          <ComposableMap projection="geoMercator" width={1000} height={500} key={activityFilter}>
            <Geographies geography={geoData.features ? geoData.features : []}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name; // Use name directly

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getCountryColor(countryName)}  // Pass country name to get the correct color
                      stroke="#fff"
                      strokeWidth="0.5"
                      onMouseEnter={() =>
                        setHoveredCountry({
                          code: geo.properties.ISO_A3,
                          name: geo.properties.name,
                          data: activityData[geo.properties.ISO_A3],
                        })
                      }
                      onMouseLeave={() => setHoveredCountry(null)}
                    />
                  );
                })
              }
            </Geographies>

            {/* <Geographies geography={geoData.features ? geoData.features : []}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  console.log("geo properties: ", geo.properties);
                  console.log("geo data: ", geoData);
                  const countryCode = geo.properties.ISO_A3 || "UNKNOWN";
                  const activityDataCode = activityData[countryCode];

                  if (!activityDataCode) {
                    console.log(`No data for countryCode: ${countryCode}`);
                    return "#e0e0e0";  // Return default color if no data
                  }

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getCountryColor(countryCode)}
                      stroke="#fff"
                      strokeWidth="0.5"
                      onMouseEnter={() =>
                        setHoveredCountry({
                          code: countryCode,
                          name: geo.properties.NAME,
                          data: activityData[countryCode],
                        })
                      }
                      onMouseLeave={() => setHoveredCountry(null)}
                    />
                  );
                })
              }
            </Geographies> */}
          </ComposableMap>
        ) : (
          <div className="flex items-center justify-center h-64">Loading map data...</div>
        )}
      </div>

      {/* Country list with activity levels */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Countries by Activity Level:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {getFilteredCountries().map(([code, data]) => (
            data ? (
              <div key={code} className={`p-3 rounded-lg flex items-center justify-between ${data.level === "high" ? "bg-green-100" : data.level === "medium" ? "bg-yellow-100" : "bg-red-100"}`}>
                <div>
                  <span className="font-medium">{data.name}</span>
                  <div className="text-sm text-gray-600">Activity: {data.value}%</div>
                </div>
                <div className={`w-3 h-3 rounded-full ${data.level === "high" ? "bg-green-500" : data.level === "medium" ? "bg-yellow-500" : "bg-red-500"}`}></div>
              </div>
            ) : null
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Statistics:</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">High Activity Countries</p>
            <p className="text-2xl font-bold">{Object.values(activityData).filter((d) => d.level === "high").length}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Medium Activity Countries</p>
            <p className="text-2xl font-bold">{Object.values(activityData).filter((d) => d.level === "medium").length}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Low Activity Countries</p>
            <p className="text-2xl font-bold">{Object.values(activityData).filter((d) => d.level === "low").length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityMap;

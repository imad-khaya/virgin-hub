"use client"; // Mark this as a client component

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const companies = [
  { id: 1, title: "Increase Customer Satisfaction", description: "Improve NPS score by 15%", location: [-95.7129, 37.0902], country: 'USA' },
  { id: 2, title: "Reduce Carbon Footprint", description: "Decrease carbon emissions by 25%", location: [-95.7, 37.5], country: 'USA' },
  { id: 3, title: "Launch New Digital Platform", description: "Create unified digital experience", location: [113.9213, -0.7893], country: 'Indonesia' },
  { id: 4, title: "Expand Market Presence", description: "Enter three new markets in Asia Pacific", location: [104.1954, 35.8617], country: 'China' },
  { id: 5, title: "Enhance Employee Wellbeing", description: "Implement comprehensive wellbeing program", location: [100.9925, 15.8700], country: 'Thailand' },
  { id: 6, title: "Optimize Flight Routes", description: "Reduce flight times and fuel consumption", location: [2.2137, 46.6034], country: 'France' },
  { id: 7, title: "Enhance Guest Experience", description: "Implement new guest services", location: [10.4515, 51.1657], country: 'Germany' },
  { id: 8, title: "Modernize Aircraft Fleet", description: "Replace aircraft with fuel-efficient models", location: [-3.435973, 55.378051], country: 'United Kingdom' },
  { id: 9, title: "Develop Sustainable Tourism Packages", description: "Create eco-friendly tourism packages", location: [137.725, 35.7436], country: 'Japan' },
  { id: 10, title: "Implement AI-Powered Customer Service", description: "Deploy AI chatbots for 24/7 support", location: [133.7751, -25.2744], country: 'Australia' },
  { id: 11, title: "Urban Green Spaces", description: "Increase green spaces in urban areas", location: [127.7669, 35.9078], country: 'South Korea' },
  { id: 12, title: "Circular Economy", description: "Create circular economy initiatives", location: [12.5674, 41.8719], country: 'Italy' },
  { id: 13, title: "Sustainable Tourism", description: "Promote eco-friendly tourism", location: [-3.7038, 40.4168], country: 'Spain' },
  { id: 14, title: "Energy Access", description: "Increase energy access in rural areas", location: [9.082, 8.6753], country: 'Nigeria' },
  { id: 15, title: "Marine Conservation", description: "Protect marine biodiversity", location: [113.9213, -0.7893], country: 'Indonesia' },
  { id: 16, title: "Renewable Energy Transition", description: "Transition to renewable energy sources", location: [-106.3468, 56.1304], country: 'Canada' },
  { id: 17, title: "Clean Water Access", description: "Ensure clean water access for communities", location: [22.9375, -30.5595], country: 'South Africa' },
  { id: 18, title: "Sustainable Agriculture", description: "Promote sustainable farming practices", location: [-95.7129, 37.0902], country: 'USA' },
  { id: 19, title: "Deforestation Prevention", description: "Prevent deforestation and land degradation", location: [113.9213, -0.7893], country: 'Indonesia' },
  { id: 20, title: "Green Energy", description: "Invest in green energy technologies", location: [104.1954, 35.8617], country: 'China' },
];

const ActivityMap = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaW1hZGtoYXlhIiwiYSI6ImNtOGkwdms4cDA3dWsyanM1bXFldW81c3oifQ.ztO22y2DlH9fTaSJDPgCrw';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-103.5917, 40.6699],
      zoom: 3
    });

    mapRef.current.on('load', () => {
      companies.forEach(company => {
        // Add a marker for each company
        new mapboxgl.Marker({
          color: '#ff0000', // Choose a color for the marker
          scale: 1 // Scale the marker size
        })
          .setLngLat(company.location)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <h1>${company.title}</h1>
              <p>${company.description}</p>
              <p>Location: ${company.country}</p>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect</button>
            `)
          )
          .addTo(mapRef.current);
      });
    });

    return () => mapRef.current.remove();
  }, []);

  return <div id="map" ref={mapContainerRef} style={{ height: '100vh' }}></div>;
};

export default ActivityMap;
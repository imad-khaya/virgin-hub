"use client"; // Mark this as a client component

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import Atlantic from "@/assets/images/companies/atlantic.avif";
import Boat from "@/assets/images/companies/boat.jpeg";
import ExperienceDays from "@/assets/images/companies/experience-days.avif";
import Galactic from "@/assets/images/companies/galactic.jpg";
import Hotels from "@/assets/images/companies/hotels.jpg";
import Money from "@/assets/images/companies/money.jpeg";
import O2 from "@/assets/images/companies/o2.jpg";
import Plane from "@/assets/images/companies/plane.png";
import Red from "@/assets/images/companies/red.jpg";
import Wines from "@/assets/images/companies/wines.webp";

import 'mapbox-gl/dist/mapbox-gl.css';

const companies = [
  { id: 1, image: Atlantic, name:"Virgin Atlantic", title: "Increase Customer Satisfaction", description: "Improve NPS score by 15%", location: [-95.7129, 37.0902], country: 'USA' },
  { id: 2, image: Boat, name:"Virgin Red", title: "Reduce Carbon Footprint", description: "Decrease carbon emissions by 25%", location: [-95.7, 37.5], country: 'USA' },
  { id: 3, image: ExperienceDays, name:"Virgin Hotels", title: "Launch New Digital Platform", description: "Create unified digital experience", location: [113.9213, -0.7893], country: 'Indonesia' },
  { id: 4, image: Galactic, name:"Virgin Galactic", title: "Expand Market Presence", description: "Enter three new markets in Asia Pacific", location: [104.1954, 35.8617], country: 'China' },
  { id: 5, image: Hotels, name:"Virgin Money", title: "Enhance Employee Wellbeing", description: "Implement comprehensive wellbeing program", location: [100.9925, 15.8700], country: 'Thailand' },
  { id: 6, image: Money, name:"Virgin Media O2", title: "Optimize Flight Routes", description: "Reduce flight times and fuel consumption", location: [2.2137, 46.6034], country: 'France' },
  { id: 7, image: O2, name:"Virgin Experience Days", title: "Enhance Guest Experience", description: "Implement new guest services", location: [10.4515, 51.1657], country: 'Germany' },
  { id: 8, image: Plane, name:"Virgin Experience Days", title: "Modernize Aircraft Fleet", description: "Replace aircraft with fuel-efficient models", location: [-3.435973, 55.378051], country: 'United Kingdom' },
  { id: 9, image: Red, name:"Virgin Galactic", title: "Develop Sustainable Tourism Packages", description: "Create eco-friendly tourism packages", location: [137.725, 35.7436], country: 'Japan' },
  { id: 10, image: Wines, name:"Virgin Hotels", title: "Implement AI-Powered Customer Service", description: "Deploy AI chatbots for 24/7 support", location: [133.7751, -25.2744], country: 'Australia' },
  { id: 11, image: Atlantic, name:"Virgin Atlantic", title: "Urban Green Spaces", description: "Increase green spaces in urban areas", location: [127.7669, 35.9078], country: 'South Korea' },
  { id: 12, image: Boat, name:"Virgin Atlantic", title: "Circular Economy", description: "Create circular economy initiatives", location: [12.5674, 41.8719], country: 'Italy' },
  { id: 13, image: ExperienceDays, name:"Virgin Wines", title: "Sustainable Tourism", description: "Promote eco-friendly tourism", location: [-3.7038, 40.4168], country: 'Spain' },
  { id: 14, image: Galactic, name:"Virgin Galactic", title: "Energy Access", description: "Increase energy access in rural areas", location: [9.082, 8.6753], country: 'Nigeria' },
  { id: 15, image: Hotels, name:"Virgin Media O2", title: "Marine Conservation", description: "Protect marine biodiversity", location: [113.9213, -0.7893], country: 'Indonesia' },
  { id: 16, image: O2, name:"Virgin Atlantic", title: "Renewable Energy Transition", description: "Transition to renewable energy sources", location: [-106.3468, 56.1304], country: 'Canada' },
  { id: 17, image: Plane, name:"Virgin Red", title: "Clean Water Access", description: "Ensure clean water access for communities", location: [22.9375, -30.5595], country: 'South Africa' },
  { id: 18, image: Hotels, name:"Virgin Money", title: "Sustainable Agriculture", description: "Promote sustainable farming practices", location: [-95.7129, 37.0902], country: 'USA' },
  { id: 19, image: Red, name:"Virgin Hotels", title: "Deforestation Prevention", description: "Prevent deforestation and land degradation", location: [113.9213, -0.7893], country: 'Indonesia' },
  { id: 20, image: Plane, name:"Virgin Red", title: "Green Energy", description: "Invest in green energy technologies", location: [104.1954, 35.8617], country: 'China' },
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
              <div style="text-align: start; background-image: url('${company.image.src}'); background-size: cover; background-position: center;">
                <h1 class="text-white font-semibold" style="background-color: none;text-shadow: 2px 2px 5px black;">Company: ${company.name}</h1>
                <h1 class="text-white font-semibold" style="text-shadow: 2px 2px 5px black;">${company.title}</h1>
                <h1 class="text-white font-semibold" style="text-shadow: 2px 2px 5px black;">${company.description}</h1>
                <h1 class="text-white font-semibold" style="text-shadow: 2px 2px 5px black;">Location: ${company.country}</h1>
                <button style="background-color: rgb(15, 97, 213); color: white; padding: 10px 20px; border-radius: 9px; border: none; outline: none;">
                  <a href='/'>Connect</a>
                </button>
              </div>
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
"use client";

import { useState, useEffect } from "react";
import { NavLink } from "react-bootstrap";
import axios from "axios";

export default function AllPetsMap({ petList }) {
  let MAP_CIRCLE_RADIUS_MILES = 50;
  const [displayCircle, setDisplayCircle] = useState(true);
  const [lat, setLat] = useState(60);
  const [lng, setLng] = useState(-110);
  const [petLocationArr, setPetLocationArr] = useState([]);

  // Default Map Position
  let mapPosition = { lat, lng };

  function showPosition(position) {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }

  // Load Pet Information
  const loadPetLocation = async (pL) => {
    const plA = [];
    for (let pet of pL) {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${pet.zipCode}&key=${process.env.REACT_APP_MAPS_API_KEY}`
      );
      const petLocation = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
        name: pet.name,
        petId: pet.petId,
      };
      plA.push(petLocation);
    }
    setPetLocationArr(plA);
  };
  
  // If device location is available, get current device location and update map position
  if (navigator.geolocation) {
    console.log("Geolocation is supported by this browser.");
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  useEffect(() => {
    loadPetLocation(petList);
    initMap();
  }, []);

  useEffect(() => {
    initMap();
  }, [lat, lng, petLocationArr])

  // INIT MAP FUNCTION TO CREATE MAP

  let map;
  async function initMap() {
    const {AdvancedMarkerElement} = await google.maps.importLibrary('marker');

    // Create the map.
    console.log("Map Position:", mapPosition);
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: mapPosition,
      mapId: process.env.REACT_APP_MAPS_API_KEY
    });

    if (displayCircle) {
      const userCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: mapPosition,
        radius: MAP_CIRCLE_RADIUS_MILES * 1609.344,
      });
    }
    
    petLocationArr.forEach((pl) => {
      const newMarker = new AdvancedMarkerElement({
        map,
        position: { lat: pl.lat, lng: pl.lng}
      })
      console.log("New Marker created!");
    })

  }
  window.initMap = initMap;

  return <div style={{ height: "80vh" }} id="map"></div>;
}

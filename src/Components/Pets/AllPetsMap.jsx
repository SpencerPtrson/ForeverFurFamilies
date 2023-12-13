"use client";

import { useState, useEffect } from "react";
import { Nav, NavLink } from "react-bootstrap";
import axios from "axios";
import { InfoWindow } from "@vis.gl/react-google-maps";

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
        petIMG: pet.picture,
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

  // Update map
  useEffect(() => {
    loadPetLocation(petList);
  }, []);

  useEffect(() => {
    initMap();
  }, [lat, lng, petLocationArr]);

  // INIT MAP FUNCTION TO CREATE MAP
  async function initMap() {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { InfoWindow } = await google.maps.importLibrary("maps");

    // Create the map.
    console.log("Map Position:", mapPosition);
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: mapPosition,
      mapId: process.env.REACT_APP_MAPS_API_KEY,
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

    // Create an info window to share between markers
    const infoWindow = new InfoWindow();

    petLocationArr.forEach((pl) => {
      const newMarker = new AdvancedMarkerElement({
        map,
        position: { lat: pl.lat, lng: pl.lng },
        title: pl.name,
      });
      newMarker.addListener("click", ({ domEvent, latLng }) => {
        const { target } = domEvent;
        infoWindow.close();
        const contentString = `<div>
          <a href="/SpecificPet/${pl.petId}">Here's ${pl.name}</a>
          <img src=${pl.petIMG} />
        </div>`;

        console.log(contentString);
        infoWindow.setContent(contentString);
        infoWindow.open(newMarker.map, newMarker);
      });
    });
  }

  window.initMap = initMap;

  return (
    <div>
      <div style={{ height: "80vh" }} id="map"></div>
    </div>
  );
}

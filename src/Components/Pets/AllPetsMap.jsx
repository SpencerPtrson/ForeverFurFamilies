"use client";

import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useState, useEffect } from "react";

export default function AllPetsMap({ petList }) {
  let MAP_CIRCLE_RADIUS_MILES = 50;
  const [displayCircle, setDisplayCircle] = useState(true);
  const [lat, setLat] = useState(60);
  const [lng, setLng] = useState(-110);
  const [petLocationArr, setPetLocationArr] = useState(petList);

  // Default Map Position
  let mapPosition = { lat, lng };

  function showPosition(position) {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }

  const loadPetLocation = async (pL) => {
    const plA = [];
    for (let pet of pL) {
      let sharedLocation = false;

      const petLocation = {
        lat: +pet.latitude,
        lng: +pet.longitude,
        name: pet.name,
        petId: pet.petId,
        petIMG: pet.picture,
      };

      if (
        plA.filter(
          (pet) => pet.lat === petLocation.lat && pet.lng === petLocation.lng
        ).length > 0
      ) {
        // console.log(pet.name, "shares a location with another.");
        sharedLocation = true;
      }

      while (sharedLocation) {
        // console.log("Moving pet slightly laterally.");
        petLocation.lng += 0.00001;
        // console.log("Current Pet Lcoation:", petLocation.lat, petLocation.lng);
        // console.log("Checking if pet still shares a location");
        if (
          plA.filter(
            (pet) => pet.lat === petLocation.lat && pet.lng === petLocation.lng
          ).length === 0
        ) {
          // console.log("Pet no longer shares a location.");
          sharedLocation = false;
        }
      }

      plA.push(petLocation);
    }
    setPetLocationArr(plA);
  };

  // If device location is available, get current device location and update map position
  if (navigator.geolocation) {
    // console.log("Geolocation is supported by this browser.");
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    // console.log("Geolocation is not supported by this browser.");
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
    // console.log("Map Position:", mapPosition);
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: mapPosition,
      mapId: process.env.REACT_APP_MAPS_API_KEY,
    });

    // Create Display Circle
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

    // Create an info window to share betwenen markers
    const infoWindow = new InfoWindow();

    // Create Markers
    const markers = petLocationArr.map((pl) => {
      // console.log("LatLng for marker maker:", pl.lat, pl.lng, "for pet:", pl.name);
      const newMarker = new AdvancedMarkerElement({
        map,
        position: { lat: +pl.lat, lng: +pl.lng },
        title: pl.name,
      });
      newMarker.addListener("click", ({ domEvent, latLng }) => {
        infoWindow.close();
        const contentString = `<div>
          <div align="center"><a href="/SpecificPet/${pl.petId}">Here's ${pl.name}!</a></div>
          <br />
          <img width=200 src=${pl.petIMG} />
        </div>`;

        infoWindow.setContent(contentString);
        infoWindow.open(newMarker.map, newMarker);
      });

      return newMarker;
    });
    new MarkerClusterer({ markers, map });
  }

  window.initMap = initMap;

  return (
    <div>
      <div style={{ height: "80vh", border: "1px solid black" }} id="map"></div>
    </div>
  );
}

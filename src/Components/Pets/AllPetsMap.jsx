"use client";

import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { NavLink } from "react-bootstrap";
import axios from "axios";

export default function AllPetsMap({ petList }) {
  console.log("Pet List:", petList);

  const [lat, setLat] = useState(50);
  const [lng, setLng] = useState(-110);
  const [open, setOpen] = useState(false);
  const [petLocationArr, setPetLocationArr] = useState([]);
  console.log("Pet + Location:", petLocationArr);

  // Default Map Position
  let mapPosition = { lat, lng };
  console.log("Map Position:", mapPosition);

  // If device location is available, get current device location and update map position
  if (navigator.geolocation) {
    console.log("Geolocation is supported by this browser.");
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  function showPosition(position) {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }

  // Display a circle radius around the user

  // Load Latitude and Longitude
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

  // Create markers for each pet
  const markerList = petLocationArr.map((el) => {
    return (
      <AdvancedMarker position={el} onClick={() => setOpen(true)}>
        <Pin background={"blue"} />
        {open && (
          <InfoWindow position={el} onCloseClick={() => setOpen(false)}>
            <NavLink href={`/SpecificPet/${el.petId}`}>
              Here's {el.name}
            </NavLink>
          </InfoWindow>
        )}
      </AdvancedMarker>
    );
  });

  useEffect(() => {
    loadPetLocation(petList);
  }, []);

  return (
    <APIProvider apiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <div style={{ height: "80vh" }} id="AllPetsMap">
        <Map
          zoom={6}
          center={mapPosition}
          mapId={process.env.REACT_APP_MAPS_ID_KEY}
        >
          {markerList}
        </Map>
      </div>
    </APIProvider>
  );
}

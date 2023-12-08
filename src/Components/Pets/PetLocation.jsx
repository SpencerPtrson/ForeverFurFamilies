"use client";

import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import axios from "axios";

export default function PetLocation() {
  let cityName = 'neenah';
  let state = 'wisconsin';

  const [lat, setLat] = useState(54.2);
  const [lng, setLng] = useState(10);


  const getLatLng = async () => {
    const geocodeRes = await axios.get(`https://geocode.maps.co/search?city=${cityName}&state=${state}`)
    console.log("Geocode Data:", geocodeRes.data[0]);
    setLat(+geocodeRes.data[0].lat);
    setLng(+geocodeRes.data[0].lon);
  }

  useEffect(() => {
    getLatLng()
  }, []);

  let mapPosition = { lat, lng };
  console.log("Map Position:", mapPosition);

  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <div style={{ height: '40vh'}}>
        <Map zoom={9} center={mapPosition} mapId={process.env.REACT_APP_MAPS_ID_KEY}>
          <AdvancedMarker position={mapPosition} onClick={() => setOpen(true)}>
            <Pin background={'grey'}/>
            {
              open && <InfoWindow position={mapPosition} onCloseClick={() => setOpen(false)}>
                <p>I'm in Hamburg!</p>
              </InfoWindow>
            }
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}

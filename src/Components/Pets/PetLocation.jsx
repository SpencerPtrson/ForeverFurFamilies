"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function PetLocation() {
  const mapPosition = { lat: 53.54, lng: 10 };

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

// import { useState, useEffect } from "react";
import classes from "./map.module.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { toast } from "react-toastify";
import * as L from "leaflet";
import { useEffect, useState } from "react";

const Map = ({ readonly, location, onChange }) => {
  return (
    <div className={classes.container}>
      <MapContainer
        center={location || [0, 0]}
        zoom={location ? 13 : 1}
        dragging={!readonly}
        touchZoom={!readonly}
        doubleClickZoom={!readonly}
        scrollWheelZoom={!readonly}
        boxZoom={!readonly}
        keyboard={!readonly}
        attributionControl={false}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FinButtonAndMarker
          readonly={readonly}
          location={location}
          onChange={onChange}
        />
      </MapContainer>
    </div>
  );
};

export default Map;

function FinButtonAndMarker({ readonly, onChange, location }) {
  const [position, setPosition] = useState(location);
  const map = useMapEvents({
    click(e) {
      if (!readonly) {
        setPosition(e.latlng);
        onChange && onChange(e.latlng);
      }
    },
    locationfound(e) {
      setPosition(e.latlng);
      onChange && onChange(e.latlng);
      map.flyTo(e.latlng, 13);
    },
    locationerror(e) {
      toast.error(e.message);
    },
  });

  useEffect(() => {
    if (readonly && position) {
      map.setView(position, 13);
    }
    if (position && onChange) {
      onChange(position);
    }
  }, [position, readonly, map, onChange]);

  const MarkerIcon = new L.Icon({
    iconUrl: "/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  return (
    <>
      {!readonly && (
        <button
          type="button"
          className={classes.find_location}
          onClick={() => map.locate()}
        >
          Find My Location
        </button>
      )}
      {position && (
        <Marker
          position={position}
          draggable={!readonly}
          icon={MarkerIcon}
          eventHandlers={{
            dragend: (e) => {
              const newPos = e.target.getLatLng();
              setPosition(newPos);
              onChange && onChange(newPos);
            },
          }}
        >
          <Popup>Shipping Location</Popup>
        </Marker>
      )}
    </>
  );
}

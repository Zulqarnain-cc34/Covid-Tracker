import React from "react";
import "../Css/Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "../Css/Map.css";
import { ShowDataOnMap } from "../util";
function Map({ countries, caseType, Center, Zoom }) {
  return (
    <div className="map">
      <LeafletMap center={Center} zoom={Zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http:osm.org/copyright/">OpenStreetMap</a> Contributors'
        />
        {ShowDataOnMap(countries, caseType)}
      </LeafletMap>
    </div>
  );
}

export default Map;

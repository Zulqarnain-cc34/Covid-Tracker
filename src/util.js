import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

const ColorTypes = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const ShowDataOnMap = (data, caseType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country?.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={ColorTypes[caseType].hex}
      fillColor={ColorTypes[caseType].hex}
      radius={Math.sqrt(country[caseType]) * ColorTypes[caseType].multiplier}
    >
      <Popup className="Popup">
        <div>
          <div
            className="info_flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info_countryName">{country.country}</div>
          <div className="info_cases">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info_recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info_deaths">
            deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const PrettyPrintStats = (stat) =>
  stat ? `+${numeral(stat).format("0,0a")}` : "+0";

import React, { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  CardContent,
  Card,
} from "@material-ui/core";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";
import Table from "./Components/Table";
import { PrettyPrintStats, sortData } from "./util.js";
import LineGraph from "./Components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [CountriesName, setCountriesName] = useState([]);
  const [Country, setCountry] = useState("WorldWide");
  const [CountryInfo, setCountryInfo] = useState({});
  const [TableData, setTableData] = useState([]);
  const [Center, setCenter] = useState({ lat: 34.80074, lng: -40.47 });
  const [Zoom, setZoom] = useState(3);
  const [CasesTypes, setCasesTypes] = useState("cases");
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

  useEffect(() => {
    async function GetCountriesData() {
      const countries = await fetch("https://disease.sh/v3/covid-19/countries");
      const CountriesData = await countries.json();

      await setCountriesName(
        CountriesData.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }))
      );
      await setTableData(sortData(CountriesData));
    }
    GetCountriesData();
  }, []);

  const onChangeCountries = async (e) => {
    let countryCode = e.target.value;
    const url =
      countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setCenter([data.countryInfo.lat, data.countryInfo.long]);
        setZoom(4);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div className="left">
        <div className="app__header">
          <h1>Covid Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onChangeCountries}
              value={Country}
            >
              <MenuItem value="WorldWide">WorldWide</MenuItem>
              {CountriesName.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            isRed
            active={CasesTypes === "cases"}
            onClick={(e) => setCasesTypes("cases")}
            title="Coronavirus Cases"
            cases={PrettyPrintStats(CountryInfo.todayCases)}
            total={PrettyPrintStats(CountryInfo.cases)}
          />
          <InfoBox
            active={CasesTypes === "recovered"}
            onClick={(e) => setCasesTypes("recovered")}
            title="Recovered"
            cases={PrettyPrintStats(CountryInfo.todayRecovered)}
            total={PrettyPrintStats(CountryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={CasesTypes === "deaths"}
            onClick={(e) => setCasesTypes("deaths")}
            title="Deaths"
            cases={PrettyPrintStats(CountryInfo.todayDeaths)}
            total={PrettyPrintStats(CountryInfo.deaths)}
          />
        </div>
        <Map
          caseType={CasesTypes}
          countries={TableData}
          Center={Center}
          Zoom={Zoom}
        />
      </div>

      <Card className="right">
        <CardContent>
          <h2>Live Cases By Countries</h2>
          <Table countries={TableData} />
          <h2 className="app__graphTitle">WorldWide New Cases </h2>
          <LineGraph caseType={CasesTypes} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

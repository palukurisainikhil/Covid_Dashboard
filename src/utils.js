import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColors = {
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

//sorting countries in the table based on their cases
export const getsorteddata = (data) => {
  const sortdata = [...data];
  sortdata.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortdata;
};

//showing circles,popus in the map

export const showMapCircles = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div>
          <img src={country.countryInfo.flag} width="100" />
        </div>
        <div>
          <b>{country.country}</b>
        </div>
        <div>Cases:{numeral(country.cases).format("0,0")};</div>
        <div>Recoverd:{numeral(country.recovered).format("0,0")};</div>
        <div>Deaths:{numeral(country.deaths).format("0,0")};</div>
      </Popup>
    </Circle>
  ));

export default Map;

// which prettifies the numbers
//10000000=10m(in box), 100000-> 100,000 (in the table)
export const preetifyValue = (value) => {
  return value ? `+${numeral(value).format("0.0a")}` : "+0";
};

export const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};

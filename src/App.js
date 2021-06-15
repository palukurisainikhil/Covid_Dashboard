import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Table,
} from "@material-ui/core";
import "./app.css";
import Box from "./Box.js";
import { sizing } from "@material-ui/system";
import Tabledata from "./Tabledata.js";
import { getsorteddata, preetifyValue } from "./utils.js";
import Graph from "./Graph.js";
import "./Box.css";
import Map from "./Map.js";
import "leaflet/dist/leaflet.css";
import MediaCard from "./MediaCard.js";
import alanBtn from "@alan-ai/alan-sdk-web";
import Test from "./Test.js";

function App() {
  const [countries, setcountries] = useState([]);
  const [countryData, setcountryData] = useState("worldwide");
  const [countryDataInfo, setcountryDataInfo] = useState({});
  const [tableData, settableData] = useState([]);
  const [piechart, setpiechart] = useState({});
  const [mapCenter, setmapCenter] = useState({
    lat: 20.5936832,
    lng: 78.962883,
  });
  const [mapZoom, setmapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setcasesType] = useState("cases");
  const [getCardData, setgetCardData] = useState([]);
  console.log(getCardData);

  //this Useeffect for the Alan api
  useEffect(() => {
    alanBtn({
      key:
        "860d0fbef6925d94d611b3eb8d09d4762e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, data }) => {
        if (command === "testcommand") {
          setcountryDataInfo(data);
          setcountryData(data.countryInfo.iso2);
          setmapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setmapZoom(4);
        } else if (command == "newscommand") {
          let fdata = [];
          console.log(data);
          let articlesData = data.articles;
          articlesData.map((data) => {
            let ndata = {
              title: data.title,
              description: data.description,
              url: data.url,
              imageurl: data.urlToImage,
              content: data.content,
            };
            fdata.push(ndata);
          });
          setgetCardData(fdata);
          console.log(fdata);
        }
      },
    });
  }, []);

  //this UseEffect for displaying worlwide cases,recoverd,deaths intially(when no country is not selected(worldwide))[setcountrydata]
  //and also for linegraph(which displays daily deaths,recoverd,active cases)
  useEffect(() => {
    const worldwidedata = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setcountryDataInfo(data);
          const piedata = [];
          piedata.push(data.cases);
          piedata.push(data.deaths);
          piedata.push(data.recovered);

          setpiechart(piedata);
        });
    };
    worldwidedata();
  }, []);

  //

  useEffect(() => {
    const getcountriesdata = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const sorteddata = getsorteddata(data);

          //sorted countries in the table based on the active cases
          settableData(sorteddata);

          //for the map (used in utils)
          setMapCountries(data);

          const countriesdata = data.map((sdata) => ({
            name: sdata.country,
            value: sdata.countryInfo.iso2,
          }));

          //this state is for the dispalying countries in the options
          setcountries(countriesdata);
        });
    };
    getcountriesdata();
  }, []);

  //Getting the data of the selected country and rendering the active,recoverd,deaths cases in the box
  const changecountrydata = async (event) => {
    const countryinfo = event.target.value;
    console.log("countryinfo" + countryinfo);
    const url =
      countryinfo === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryinfo}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //countryData sets the selected country in the select value
        setcountryData(countryinfo);

        //Data for displaying in box
        setcountryDataInfo(data);

        //Map settings .when the country selected we are setting the center&zoom position in the map
        if (countryinfo !== "worldwide") {
          setmapCenter([data.countryInfo.lat, data.countryInfo.long]);
        } else {
          setmapCenter([34.80746, -40.4796]);
        }
        setmapZoom(4);
      })
      .catch((err) => console.log(err));
  };

  //Main app
  return (
    <div>
      <div className="app">
        <div className="app_leftside">
          <div className="app_header">
            <div className="heading">
              <h1>CORONA VIRUS TRACKER</h1>
            </div>
            <div className="select_button">
              <FormControl>
                <Select
                  onChange={changecountrydata}
                  value={countryData}
                  variant={"outlined"}
                  width={300}
                >
                  {/*setting the options by looping through all countries */}

                  <MenuItem value="worldwide">worldwide</MenuItem>
                  {countries.map((country) => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* redcolor to know the active selected box
          selecteditem for setting additional class in the box component
          onclick for setting the selected data
          when cases box is clicked
          displaying cases with red circles in the map and also displaying cases in the line graph
          when recoverd box is clicked
          displaying recoverd data with green circles in the map and also displaying recoverd in the line graph
       */}

          <div className="app_box">
            <Box
              redColor
              title="Coronaviruscases"
              selectedItem={casesType === "cases"}
              onClick={() => setcasesType("cases")}
              active={countryDataInfo.active}
              total={countryDataInfo.activePerOneMillion}
            />
            <Box
              title="Recovered"
              selectedItem={casesType === "recovered"}
              onClick={() => setcasesType("recovered")}
              active={countryDataInfo.todayRecovered}
              total={countryDataInfo.recovered}
            />
            <Box
              redColor
              title="Deaths"
              selectedItem={casesType === "deaths"}
              onClick={() => setcasesType("deaths")}
              active={countryDataInfo.todayDeaths}
              total={countryDataInfo.deaths}
            />
          </div>

          {/*setting the map */}

          <Map
            center={mapCenter}
            zoom={mapZoom}
            mapcountries={mapCountries}
            casesType={casesType}
          />
        </div>
        {/*setting the tabledata and graph */}

        <div className="app_rightside">
          <Tabledata countriesTable={tableData} />
          <Graph casesType={casesType} piechart={piechart} />
        </div>
      </div>
      <div className="card">
        <MediaCard getCardData={getCardData} />
      </div>
    </div>
  );
}

export default App;

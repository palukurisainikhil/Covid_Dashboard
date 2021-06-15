import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import numeral from "numeral";
import { Card } from "@material-ui/core";
import './Graph.css';

//additional features in the graph
const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};






//
function Graph({ casesType = "cases", piechart }) {
    const [graphData, setgraphData] = useState([])



    function buildCharData(fdata, casesType) {
        let finalGraphData = []
        let lastDate = false;
        let lastDateCases = 0;
        console.log(lastDate);
        for (let data in fdata[casesType]) {
            if (lastDate) {
                let newData = {
                    x: data,
                    y: fdata[casesType][data] - lastDateCases,
                };
                finalGraphData.push(newData)

            }
            lastDate = true;
            lastDateCases = fdata[casesType][data];

        }
        return finalGraphData;
    }



    //getting the last 120 days daily data from now to display the cases dailywise in the graph
    useEffect(() => {
        const dayData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then((res) => res.json())
                .then((data) => {
                    const finalData = buildCharData(data, casesType)
                    setgraphData(finalData)
                }
                )
        }
        dayData();
    }, [casesType])



    return (
        <div >
            <Card className="graph">
                <h4>DAILY COVIDCASES</h4>
                {graphData?.length > 0 && (
                    <Line data={{
                        datasets: [
                            {
                                backgroundColor: casesType == 'cases' ? "rgba(204, 16, 52, 0.5)" : "rgb(125, 215, 29)",
                                borderColor: casesType == 'cases' ? "#CC1034" : "#7dd71d",
                                data: graphData,
                            },
                        ],
                    }} options={options} />

                )}
            </Card>

        </div>
    );
}

export default Graph;
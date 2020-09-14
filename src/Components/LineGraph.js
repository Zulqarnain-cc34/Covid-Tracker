import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "../Css/lineGraph.css";
function LineGraph({ caseType }) {
  const [data, setdata] = useState({});
  const options = {
    legend: { display: false },
    elements: { points: { radius: 0 } },
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
          gridLines: { display: false },
          ticks: {
            callback: function (value, index, data) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };
  function BuildChartData(data, caseType = "cases") {
    const ChartData = [];
    let LastDataPoint;

    for (let date in data[caseType]) {
      if (LastDataPoint) {
        const newChartData = {
          x: date,
          y: data[caseType][date] - LastDataPoint,
        };
        ChartData.push(newChartData);
      }
      LastDataPoint = data[caseType][date];
    }
    return ChartData;
  }

  useEffect(() => {
    const FetchData = async () => {
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          const ChartData = BuildChartData(data, caseType);
          setdata(ChartData);
        });
    };
    FetchData();
  }, [caseType]);

  return (
    <div className="lineGraph">
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#CC1034",
              },
            ],
          }}
        ></Line>
      )}
    </div>
  );
}

export default LineGraph;

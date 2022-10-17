import React from "react";
import Chart from "react-apexcharts";

function Charts() {
  const data = {
    options: {
      chart: {
        id: "basic-line",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <div className="weather-graph">
      <div>
        <div className="graph">
          <Chart
            options={data.options}
            series={data.series}
            type="line"
            // width="100%"
          />
        </div>
      </div>
    </div>
  );
}
export default Charts;

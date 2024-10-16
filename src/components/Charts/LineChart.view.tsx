import React, { Component, useMemo } from "react";
import Chart from "react-apexcharts";
import { data } from "../../data";

interface Props {}

const LineChart = () => {
  const state = {
    series: [
      {
        data: data,
      },
    ],
  };

  const newData = useMemo(() => {
    const seriesData = data.map((e) => ({
      x: new Date(e.start).getTime(), // Use timestamp for x-axis
      y: e.timeSpent, // Use time spent for y-axis
    }));
    return seriesData;
  }, []);

  console.log("newData", newData);

  return (
    <div className="line">
      <Chart
        options={{
          stroke: { curve: "smooth" },
          chart: { type: "line" },
          xaxis: { type: "datetime" },
        }}
        series={[
          {
            data: newData,
          },
        ]}
        type="line"
        width="500"
      />
    </div>
  );
};
export default LineChart;

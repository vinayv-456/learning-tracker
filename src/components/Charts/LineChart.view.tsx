import React, { Component, useMemo } from "react";
import Chart from "react-apexcharts";
import { ParsedEventItem } from "../../types";

interface Props {
  events: ParsedEventItem[];
}

const LineChart = (props: Props) => {
  const { events } = props;
  const newData = useMemo(() => {
    const seriesData = events.map((e) => ({
      x: new Date(e.start).getTime(), // Use timestamp for x-axis
      y: e.timeSpent, // Use time spent for y-axis
    }));
    return seriesData;
  }, [events]);

  console.log("newData", newData);

  return (
    <Chart
      options={{
        stroke: { curve: "straight" },
        chart: { type: "line" },
        xaxis: { type: "datetime" },
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart: {
                width: "100%",
                heigth: "250",
              },
            },
          },
        ],
      }}
      series={[
        {
          data: newData,
        },
      ]}
      type="line"
      width="500"
      height="200"
    />
  );
};
export default LineChart;

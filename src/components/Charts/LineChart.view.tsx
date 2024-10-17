import React, { Component, useMemo } from "react";
import Chart from "react-apexcharts";
import { data } from "../../data";
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
    <div className="line">
      <Chart
        options={{
          stroke: { curve: "straight" },
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

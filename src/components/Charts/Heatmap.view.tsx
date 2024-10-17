import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
// import { data } from "../../data";
import "./Heatmap.css";
import { ParsedEventItem } from "../../types";

interface Props {
  events: ParsedEventItem[];
}

export default function Heatmap(props: Props) {
  const { events } = props;
  const today = new Date();
  const newData = events.map((e) => ({
    date: e.start,
    count: e.timeSpent,
  }));

  return (
    <CalendarHeatmap
      startDate={new Date(today.getFullYear(), today.getMonth() - 11, 1)}
      endDate={today}
      values={newData}
      classForValue={(value) => {
        if (!value) return "color-empty"; // Default for empty days
        if (value.count <= 2) return "color-scale-1";
        if (value.count <= 5) return "color-scale-2";
        if (value.count <= 8) return "color-scale-3";
        return "color-scale-4";
      }}
    />
  );
}

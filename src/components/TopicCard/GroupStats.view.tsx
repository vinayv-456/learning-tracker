import React from "react";
import { StatsObj } from "../../types";
import { StatCard } from "./GroupStats.style";
import { FlexContainer } from "../../index.style";

interface Props {
  groupName: string;
  stats: StatsObj;
}

interface CardProps {
  heading: string;
  value: number;
  color: string;
}
function Card(props: CardProps) {
  const { heading, value, color } = props;
  return (
    <StatCard color={color}>
      <h2>{heading}</h2>
      <h1>{value}</h1>
    </StatCard>
  );
}

function GroupStatsComp(props: Props) {
  const { groupName, stats } = props;
  const { hours, days, events } = stats;

  return (
    <div>
      <span>{`group: ${groupName}`}</span>
      <FlexContainer>
        <Card heading="Total Hours Spent" value={hours || 0} color="#DBEAFE" />
        <Card
          heading="Total Days with Activity"
          value={days || 0}
          color="#DCFCE7"
        />
        <Card heading="Number of Events" value={events || 0} color="#FEF9C3" />
      </FlexContainer>
    </div>
  );
}

export default GroupStatsComp;

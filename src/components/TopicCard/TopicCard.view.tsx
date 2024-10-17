import React from "react";
import { GroupStats, ParsedEventListEntries } from "../../types";
import GroupStatsComp from "./GroupStats.view";
import LineChart from "../Charts/LineChart.view";
import Heatmap from "../Charts/Heatmap.view";
import EventsList from "../CalendarEventsList/EventsList.view";
import { FlexContainer } from "../../index.style";
import { TopicCardStyle } from "./GroupStats.style";

interface Props {
  calendarEvents: ParsedEventListEntries;
  groupedStats: GroupStats;
  fetchEvents: () => void;
}

function TopicCard(props: Props) {
  const { calendarEvents = {}, groupedStats, fetchEvents } = props;

  return (
    <div>
      {Object.entries(groupedStats).map((entry) => {
        const [groupName, stats] = entry;
        return (
          <TopicCardStyle>
            {/* stats */}
            <GroupStatsComp groupName={groupName} stats={stats} />
            {/* charts */}
            <FlexContainer>
              <LineChart events={calendarEvents[groupName]} />
              <Heatmap events={calendarEvents[groupName]} />
            </FlexContainer>
            {/* list */}
            <EventsList
              events={calendarEvents[groupName]}
              fetchEvents={fetchEvents}
            />
          </TopicCardStyle>
        );
      })}
    </div>
  );
}

export default TopicCard;

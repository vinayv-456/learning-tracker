import { FormatedSelections } from "react-cascading-menu/build/types";
import {
  Duration,
  EventItem,
  GroupStats,
  ParsedEventItem,
  ParsedEventListEntries,
} from "../../types";
import moment from "moment";
import { mvpSelectedProps } from "react-cascading-menu/build/src/types";

interface EventRawPayload {
  duration: Duration;
  selectedDate: string;
  description: string;
  satisfaction: Number;
  selections: string[][] | undefined;
}

export const extractHrs = (str: string) => {
  const hourRegex = /(\d+(\.\d+)?)hr/;
  const match = str.match(hourRegex);
  return match ? match[1] : "-1";
};

export const parseEventPayload = (event: EventItem, calendar: string) => {
  // console.log("event", event);

  const {
    id,
    subject,
    body,
    // TODO: UTC
    start: { dateTime: startDateTime },
    end: { dateTime: endDateTime },
    bodyPreview,
    location: { displayName },
  } = event;
  const hrs = extractHrs(subject);
  return {
    eventId: id,
    title: subject,
    timeSpent: hrs,
    description: bodyPreview,
    location: displayName,
    start: startDateTime,
    end: endDateTime,
    calendar,
  };
};

export const formatEventPayload = (eventPayload: EventRawPayload) => {
  const { duration, selectedDate, description, satisfaction, selections } =
    eventPayload;
  const hrs = `${duration.hours + duration.minutes / 60}hr`;
  // TODO: frame the proper title
  const topic = selections?.reduce((acc: string, e: string[]) => {
    if (e.length > 1) {
      return acc
        ? `${acc}_${e[1]}_${hrs}_${e?.[2] || ""}`
        : `${e[1]}_${hrs}_${e?.[2] || ""}`;
    }
    return acc;
  }, "");
  return {
    subject: topic,
    body: {
      contentType: "HTML",
      content: description,
    },
    location: {
      displayName: selections?.reduce((acc, e) => {
        return acc ? `${acc}_${e.join("_")}` : e.join("_");
      }, ""),
    },
    start: {
      dateTime: moment(selectedDate).format("YYYY-MM-DD"),
      timeZone: "Eastern Standard Time",
    },
    end: {
      dateTime: moment(selectedDate).add(1, "day").format("YYYY-MM-DD"),
      timeZone: "Eastern Standard Time",
    },
    isAllDay: true,
  };
};

export const groupByEvents = (
  events: ParsedEventListEntries,
  leafNodes: mvpSelectedProps[][] | undefined
): [ParsedEventListEntries, GroupStats] => {
  let groupedEvents = {};
  let groupedStats: GroupStats = {};
  const allLeafs = leafNodes?.map((e) => e[e.length - 1]?.label);
  // console.log("allLeafs", allLeafs);

  if (events && allLeafs?.length) {
    groupedEvents = Object.values(events).reduce(
      (acc: ParsedEventListEntries, calendarEvents) => {
        // console.log("calendarEvents", calendarEvents);

        // grouping the current calendar events
        const res = allLeafs.reduce(
          (acc2: ParsedEventListEntries, leaf: string) => {
            // topic-wise(leaf) grouping for the all current events
            let obj = acc2?.[leaf] || [];
            const newEvents = calendarEvents.filter((e) => {
              const isValid = e.location.includes(leaf);
              if (isValid) {
                groupedStats[leaf] = {
                  hours:
                    (groupedStats[leaf]?.hours || 0) + parseInt(e.timeSpent),
                  days: (groupedStats[leaf]?.days || 0) + 1,
                  events: (groupedStats[leaf]?.events || 0) + 1,
                };
              }
              return isValid;
            });
            // console.log("new events", newEvents, "leaf", leaf);

            return {
              ...acc2,
              [leaf]: [...obj, ...newEvents],
            };
          },
          {}
        );
        // console.log("current callender additions", res);

        return {
          ...acc,
          ...res,
        };
      },
      {}
    );
  }
  return [groupedEvents, groupedStats];
};

import { FormatedSelections } from "react-cascading-menu/build/types";
import { Duration } from "../../types";

interface EventRawPayload {
  duration: Duration;
  selectedDate: string;
  description: string;
  satisfaction: Number;
  selections: string[][] | undefined;
}
export const formatEventPayload = (eventPayload: EventRawPayload) => {
  const { duration, selectedDate, description, satisfaction, selections } =
    eventPayload;
  // TODO: frame the proper title
  const topic = selections?.reduce((acc: string, e: string[]) => {
    if (e.length > 1) {
      return `${acc}_${e[1]}_${e?.[2] || ""}`;
    }
    return acc;
  }, "");
  return {
    subject: `${topic}_${duration.hours + duration.minutes / 60}hr`,
    body: {
      contentType: "HTML",
      content: description,
    },
    location: {
      displayName: selections?.reduce((acc, e) => {
        return `${acc}_${e.join("_")}`;
      }, ""),
    },
    start: {
      dateTime: selectedDate,
      timeZone: "Eastern Standard Time",
    },
    end: {
      dateTime: selectedDate,
      timeZone: "Eastern Standard Time",
    },
  };
};

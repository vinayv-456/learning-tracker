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
  return {
    subject: "check event",
    body: {
      contentType: "HTML",
      content: description,
    },
    locations: selections?.map((e) => ({ displayName: e })),
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

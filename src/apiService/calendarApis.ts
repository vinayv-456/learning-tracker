import { FormatedSelections } from "react-cascading-menu/build/types";
import { CalendarItem, EventItem } from "../types";
import { endPoints } from "./endpoints";
import WebService from "./webservice";
import { parseEventPayload } from "../components/EventForm/utility";
import { Obj } from "../appContext";

export const fetchCalendarList = async () => {
  try {
    const res = await WebService.get(endPoints.listCalendars);
    console.log("profile res", res);
    const formatedVal = res.data?.value.reduce(
      (acc: Object, e: CalendarItem) => {
        const { id, name, hexColor } = e;
        // { id, name, hexColor };
        return { ...acc, [name]: id };
      },
      {}
    );
    return formatedVal;
  } catch (e) {
    console.log("error in fetching calendar list", e);
  }
};

export async function getSelectedCalendarEvents(
  calendarList: { label?: string; value?: string }[],
  selections: (FormatedSelections | {})[]
) {
  // Map calendar requests to promises
  const eventRequests = Promise.all(
    calendarList.map(async (calendar, index) => {
      const { label: calendarLabel, value: calendarValue } = calendar;
      const selection = selections[index];
      if (
        typeof selection === "object" &&
        "label" in selection &&
        calendarValue
      ) {
        const endpoint = endPoints.listEventsInCalendar.replace(
          "{{calendar}}",
          calendarValue
        );
        const eventsResponse = await WebService.get(endpoint);
        const events = eventsResponse.data?.value;

        return events.map((event: EventItem) =>
          parseEventPayload(event, calendarLabel || "")
        );
      }
      return {};
    }, {})
  );

  // Wait for all promises to resolve
  const eventResults = await eventRequests;

  // Combine results into a single object
  const allEvents = eventResults.reduce((acc, curr, index) => {
    const selection = selections[index];
    if (typeof selection === "object" && "label" in selection) {
      return { ...acc, [selection.label]: curr };
    }
    return acc;
  }, {});

  return allEvents;
}

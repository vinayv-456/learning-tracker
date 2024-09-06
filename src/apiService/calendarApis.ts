import { FormatedSelections } from "react-cascading-menu/build/types";
import { CalendarItem, EventItem } from "../types";
import { endPoints } from "./endpoints";
import WebService from "./webservice";

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
  calendarList: string[],
  selections: (FormatedSelections | {})[]
) {
  // Map calendar requests to promises
  const eventRequests = Promise.all(
    calendarList.map(async (calendar, index) => {
      const selection = selections[index];
      if (typeof selection === "object" && "label" in selection) {
        const endpoint = endPoints.listEventsInCalendar.replace(
          "{{calendar}}",
          calendar
        );
        const eventsResponse = await WebService.get(endpoint);
        const events = eventsResponse.data?.value;

        return events.map((event: EventItem) => {
          const {
            subject,
            body,
            start,
            end,
            bodyPreview,
            location: { displayName },
          } = event;
          return {
            subject: subject,
            bodyPreview: bodyPreview,
            body: body,
            displayName,
            start: start,
            end: end,
          };
        });
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

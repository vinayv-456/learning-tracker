import { CalendarItem, EventItem } from "../types";
import { endPoints } from "./endpoints";
import WebService from "./webservice";

export const fetchCalendarList = async () => {
  try {
    const res = await WebService.get(endPoints.listCalendars);
    console.log("profile res", res);
    const formatedVal = res.data?.value.map((e: CalendarItem) => {
      const { id, name, hexColor } = e;
      return { id, name, hexColor };
    });
    return formatedVal;
  } catch (e) {
    console.log("error in fetching calendar list", e);
  }
};

export async function getAllCalendarEvents(calendarList: CalendarItem[]) {
  // Map calendar requests to promises
  const eventRequests = Promise.all(
    calendarList.map(async (calendar) => {
      const { id, name } = calendar;
      const endpoint = endPoints.listEventsInCalendar.replace(
        "{{calendar}}",
        id
      );
      console.log("endpoint", endpoint);

      const eventsResponse = await WebService.get(endpoint);
      const events = eventsResponse.data?.value;
      return {
        [name]: events.map((event: EventItem) => ({
          subject: event.subject,
          bodyPreview: event.bodyPreview,
          body: event.body,
          start: event.start,
          end: event.end,
        })),
      };
    })
  );

  // Wait for all promises to resolve
  const eventResults = await eventRequests;
  console.log("eventResults", eventResults);

  // Combine results into a single object
  const allEvents = eventResults.reduce(
    (acc, curr) => ({ ...acc, ...curr }),
    {}
  );

  return allEvents;
}

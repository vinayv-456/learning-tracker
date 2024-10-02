export const baseEndPoint = "https://graph.microsoft.com/v1.0/me";

interface GraphConfig {
  [endPoint: string]: string;
  listCalendars: string;
  listEventsInCalendar: string;
  listEvents: string;
}

export const endPoints: GraphConfig = {
  listCalendars: `${baseEndPoint}/calendars`,
  listEvents: `${baseEndPoint}/calendar/events`,
  listEventsInCalendar: `${baseEndPoint}/calendars/{{calendar}}/events`,
  // $filter = startwith
  // ?$filter=start/dateTime ge '2024-09-01T00:00:00Z' and end/dateTime le '2024-09-30T23:59:59Z'
  // $top=10
  // $orderby= subject desc
  addEventInCalendar: `${baseEndPoint}/calendars/{{calendar_id}}/events`,
  editEventInCalendar: `${baseEndPoint}/calendars/{{calendar_id}}/events/{{event_id}}`,
};
// ?$select=subject,body,start,end&$filter=start/dateTime%20ge%20'2024-01-18T00:00:00Z'%20and%20end/dateTime%20le%20'2024-06-19T00:00:00Z'&$orderby=start/dateTime%20asc

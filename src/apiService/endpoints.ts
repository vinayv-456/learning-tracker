export const baseEndPoint = "https://graph.microsoft.com/v1.0/me";

interface GraphConfig {
  [endPoint: string]: string;
  listCalendars: string;
  listEventsInCalendar: string;
  listEvents: string;
}

const selectCols = "id, subject, start, end, bodyPreview, location";

export const endPoints: GraphConfig = {
  listCalendars: `${baseEndPoint}/calendars`,
  listEvents: `${baseEndPoint}/calendar/events`,
  listEventsInCalendar: `${baseEndPoint}/calendars/{{calendar}}/events?$select=${selectCols}`,
  addEventInCalendar: `${baseEndPoint}/calendars/{{calendar_id}}/events`,
  editEventInCalendar: `${baseEndPoint}/calendars/{{calendar_id}}/events/{{event_id}}`,
};
// ?$select=subject,body,start,end&$filter=start/dateTime%20ge%20'2024-01-18T00:00:00Z'%20and%20end/dateTime%20le%20'2024-06-19T00:00:00Z'&$orderby=start/dateTime%20asc

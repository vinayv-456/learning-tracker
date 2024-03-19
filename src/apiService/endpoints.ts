export const baseEndPoint = "https://graph.microsoft.com/v1.0/me";

interface GraphConfig {
  listCalendars: string;
  listEventsInCalendar: string;
}

export const endPoints: GraphConfig = {
  listCalendars: `${baseEndPoint}/calendars`,
  listEventsInCalendar: `${baseEndPoint}/calendars/{{calendar}}/events`,
};
// ?$select=subject,body,start,end&$filter=start/dateTime%20ge%20'2024-01-18T00:00:00Z'%20and%20end/dateTime%20le%20'2024-06-19T00:00:00Z'&$orderby=start/dateTime%20asc

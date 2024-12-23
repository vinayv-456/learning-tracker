export interface ProfileDataType {
  givenName: string;
  surname: string;
  userPrincipalName: string;
  id: string | number;
}

export interface CalendarItem {
  id: string;
  name: string;
  hexColor: string;
}

interface Date {
  dateTime: "string";
  timeZone: "string";
}
export interface EventItem {
  id: string;
  subject: string;
  bodyPreview: string;
  body: {
    contentType: string;
    content: string;
  };
  location: {
    displayName: string;
  };
  start: Date;
  end: Date;
}

export type Name = string;
export interface EventListEntries {
  [name: string]: EventItem[];
}

export interface ParsedEventItem {
  title: string;
  start: string;
  timeSpent: string;
  description: string;
  calendar: string;
  location: string;
  eventId?: string;
}

export interface ParsedEventListEntries {
  [name: string]: ParsedEventItem[];
}

export interface EventsHeaderItem {
  label: string;
  value:
    | "title"
    | "start"
    | "timeSpent"
    | "description"
    | "calendar"
    | "location";
  type?: string;
}

export interface Duration {
  hours: number;
  minutes: number;
}

export interface formPayload {
  duration: Duration;
  selectedDate: string;
  description: string;
  satisfaction: Number;
  selections: string[][] | undefined;
  calendars: string[];
}

export interface QueryParams {
  startDate?: string;
  endDate?: string;
  top?: number;
  sortBy?: string;
  orderby?: string;
}

export interface GroupStats {
  [key: string]: StatsObj;
}
export interface StatsObj {
  hours?: number;
  days?: number;
  events?: number;
}

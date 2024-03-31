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
  subject: string;
  bodyPreview: string;
  body: {
    contentType: string;
    content: string;
  };
  start: Date;
  end: Date;
}

export type Name = string;
export interface EventListEntries {
  [name: string]: EventItem[];
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
  calendars: string[] | undefined;
}

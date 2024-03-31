interface Calendar {
  id: string;
  value: string;
}

const getCalendarId = (calendarName: string, calendars: Calendar[]) => {
  return calendars.filter((e) => e.value === calendarName);
};

export const getCalendatIds = (
  calendarList: string[],
  calendars: Calendar[]
) => {
  return calendarList.map((e) => {
    const calendarId = getCalendarId(e, calendars);
    return calendarId;
  });
};

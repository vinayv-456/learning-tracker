import React, { useEffect, useState } from "react";
import WebService from "../../apiService/webservice";
import { endPoints } from "../../apiService/endpoints";
import moment from "moment";
import { CalendarItem, EventItem, EventListEntries } from "../../types";
import {
  fetchCalendarList,
  getAllCalendarEvents,
} from "../../apiService/calendarApis";

function CalendarList() {
  const [calendarList, setCalendarList] = useState([]);
  const [eventsList, setEventsList] = useState<EventListEntries>({});
  useEffect(() => {
    const fetchEventsList = async () => {
      try {
        const calList = await fetchCalendarList();
        const blackList = ["Birthdays", "United States holidays"];
        const filteredCalList = calList.filter(
          (e: CalendarItem) => !blackList.includes(e.name)
        );
        setCalendarList(filteredCalList);
        const calendarEvents = await getAllCalendarEvents(filteredCalList);
        console.log("all calendarEvents", calendarEvents);

        setEventsList(calendarEvents);
      } catch (e) {
        console.log("error in fetching calendar list", e);
      }
    };
    fetchEventsList();
  }, []);

  console.log("calendarList", calendarList, eventsList);
  return (
    <div>
      {calendarList.map((e) => {
        const { id, name, hexColor } = e;
        return (
          <span key={id} style={{ backgroundColor: hexColor }}>
            {name}
          </span>
        );
      })}
      {calendarList.map((e) => {
        const { id, name, hexColor } = e;
        return (
          <div>
            <span>{name}</span>
            {eventsList?.[name]?.map((e) => {
              const { subject, bodyPreview, body, start, end } = e;
              return (
                <div style={{ border: "3px solid black" }}>
                  <span>{subject}</span>
                  <span>{bodyPreview}</span>
                  <span>{moment(start.dateTime).format("MM-DD-YYYY")}</span>
                  <span>{moment(end.dateTime).format("MM-DD-YYYY")}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarList;

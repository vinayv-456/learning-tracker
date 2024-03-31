import React from "react";
import EventForm from "../../components/EventForm/EventForm";
import { menuGroup } from "./data";
import { fetchCalendarList } from "../../apiService/calendarApis";
import { formPayload } from "../../types";
import { formatEventPayload } from "../../components/EventForm/utility";
import WebService from "../../apiService/webservice";
import { endPoints } from "../../apiService/endpoints";
import { getCalendatIds } from "../../apiService/calendarUtility";

interface Props {}

function AddEventForm(props: Props) {
  const handleEventSubmission = async (
    e: React.FormEvent<HTMLFormElement>,
    payload: formPayload
  ) => {
    const calendarList = await fetchCalendarList();
    const calendarIds = getCalendatIds(payload.calendars || [], calendarList);
    e.preventDefault();
    // const payload = {
    //   duration,
    //   selectedDate,
    //   description,
    //   satisfaction,
    //   selections: menuRef.current?.getAllItemsSelected(),
    // };
    const formatedPayload = formatEventPayload(payload);
    console.log(
      "form input",
      payload,
      formatedPayload,
      calendarList,
      calendarIds
    );
    // TODO: replace with actual calendar_id
    WebService.post(
      endPoints.addEventInCalendar.replace(
        "{{calendar_id}}",
        "AAMkAGFlZjEyNTg2LWFhYTYtNDBjOS1iNTM1LWFhOTQyZDg2ODNhNgBGAAAAAAAlhGK5jiP6QZQ-4kVzTS4kBwA99KSiQ4OOSKOI6W9lbhWIAAAAAAEGAAA99KSiQ4OOSKOI6W9lbhWIAAD9CXegAAA="
      ),
      formatedPayload
    );
  };
  return (
    <div>
      <EventForm
        menuGroup={menuGroup}
        handleFormSubmission={handleEventSubmission}
      />
    </div>
  );
}

export default AddEventForm;

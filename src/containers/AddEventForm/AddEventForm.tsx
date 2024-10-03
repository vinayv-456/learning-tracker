import React from "react";
import EventForm from "../../components/EventForm/EventForm";
import { fetchCalendarList } from "../../apiService/calendarApis";
import { formPayload } from "../../types";
import { formatEventPayload } from "../../components/EventForm/utility";
import WebService from "../../apiService/webservice";
import { endPoints } from "../../apiService/endpoints";
import { getCalendatIds } from "../../apiService/calendarUtility";
import { menuGroup } from "../../data";
import { useGlobalState } from "../../appContext";

interface Props {}

function AddEventForm(props: Props) {
  const state = useGlobalState();

  const handleEventSubmission = async (
    e: React.FormEvent<HTMLFormElement>,
    payload: formPayload
  ) => {
    e.preventDefault();
    // const payload = {
    //   duration,
    //   selectedDate,
    //   description,
    //   satisfaction,
    //   selections: menuRef.current?.getAllItemsSelected(),
    // };
    const formatedPayload = formatEventPayload(payload);
    // console.log("formatedPayload", formatedPayload, "payload", payload);
    // console.log("payload.calendars", payload.calendars);

    for (const cal of payload.calendars) {
      let cal_id;
      if (typeof state.calendars === "object") {
        cal_id = cal ? state.calendars[cal] : "";
        console.log("cal", cal_id, cal);
      }

      if (cal_id) {
        WebService.post(
          endPoints.addEventInCalendar.replace("{{calendar_id}}", cal_id),
          formatedPayload
        );
      }
    }
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

import React from "react";
import {
  ACTION_TYPES,
  useGlobalDispatch,
  useGlobalState,
} from "../../appContext";
import { formatEventPayload } from "../../components/EventForm/utility";
import WebService from "../../apiService/webservice";
import { endPoints } from "../../apiService/endpoints";
import EventForm from "../../components/EventForm/EventForm";
import { formPayload, ParsedEventItem } from "../../types";
import { menuGroup } from "../../data";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  eventDetails?: ParsedEventItem;
  onSubmit: () => void;
}

function EditEventForm(props: Props) {
  const state = useGlobalState();
  // const {
  //   state: { eventDetails },
  // } = useLocation();
  const navigate = useNavigate();
  const { eventDetails, onSubmit } = props;
  const dispatch = useGlobalDispatch();

  const handleEventSubmission = async (
    e: React.FormEvent<HTMLFormElement>,
    payload: formPayload
  ) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPES.LOADING, payload: { loading: false } });
    const formatedPayload = formatEventPayload(payload);
    console.log("forma", formatedPayload, eventDetails?.eventId);

    for (const cal of payload.calendars) {
      let cal_id;
      if (typeof state.calendars === "object") {
        cal_id = cal ? state.calendars[cal] : "";
        console.log("cal", cal_id, cal);
      }

      if (cal_id && eventDetails?.eventId) {
        await WebService.patch(
          endPoints.editEventInCalendar
            .replace("{{calendar_id}}", cal_id)
            .replace("{{event_id}}", eventDetails.eventId),
          formatedPayload
        );
        dispatch({ type: ACTION_TYPES.LOADING, payload: { loading: false } });
        onSubmit();
        // navigate("/calendar");
      }
    }
  };
  console.log("eventDetails", location, eventDetails);

  return (
    <div>
      <EventForm
        menuGroup={menuGroup}
        formDetails={eventDetails}
        handleFormSubmission={handleEventSubmission}
      />
    </div>
  );
}

export default EditEventForm;

import React, { useState } from "react";
import {
  EventItem,
  EventListEntries,
  EventsHeaderItem,
  ParsedEventItem,
  ParsedEventListEntries,
} from "../../types";
import { eventsHeader } from "../../constants";
import { Router, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import EditEventForm from "../../containers/EditEventForm/EditEventForm.view";
import moment from "moment";

interface Props {
  calendarEvents: ParsedEventListEntries;
  fetchEvents: () => void;
}

const initEventDetails = {
  title: "",
  start: "",
  timeSpent: "",
  description: "",
  calendar: "",
  location: "",
  eventId: "",
};

function CalendarEventsList(props: Props) {
  const { calendarEvents = {}, fetchEvents } = props;
  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeEvent, setActiveEvent] =
    useState<ParsedEventItem>(initEventDetails);
  const handleEventEdit = (details: ParsedEventItem) => {
    setActiveEvent(details);
    setShowModal(true);
  };
  const handlecloseModal = () => {
    setShowModal(false);
  };

  const onEventSubmission = () => {
    fetchEvents();
    setActiveEvent(initEventDetails);
    handlecloseModal();
  };

  return (
    <div>
      {Object.values(calendarEvents).map((events: ParsedEventItem[]) => {
        // const {} = e;
        return (
          <table>
            {/* table header */}
            <tr>
              {eventsHeader.map((e) => (
                <>
                  <th>{e.label}</th>
                </>
              ))}
            </tr>
            {/* table rows    */}
            {events.map((e: ParsedEventItem) => {
              return (
                <tr>
                  {eventsHeader.map((headerItem: EventsHeaderItem) => {
                    const col = headerItem.value;
                    const colType = headerItem.type;
                    console.log("col", colType);

                    return (
                      <>
                        <td>
                          {colType === "date"
                            ? moment(e[col]).format("DD-MM-YYYY")
                            : e[col]}
                        </td>
                      </>
                    );
                  })}
                  <td onClick={() => handleEventEdit(e)}>edit</td>
                </tr>
              );
            })}
          </table>
        );
      })}
      <Modal isOpen={showModal} onClose={handlecloseModal}>
        <EditEventForm
          eventDetails={activeEvent}
          onSubmit={onEventSubmission}
        />
      </Modal>
    </div>
  );
}

export default CalendarEventsList;

import React, { useState } from "react";
import { eventsHeader } from "../../constants";
import {
  EventsHeaderItem,
  ParsedEventItem,
  ParsedEventListEntries,
} from "../../types";
import moment from "moment";
import Modal from "../Modal";
import EditEventForm from "../../containers/EditEventForm/EditEventForm.view";
import { CollapsibleContainer } from "./EventsList.style";

interface Props {
  events: ParsedEventItem[];
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

function EventsList(props: Props) {
  const { events, fetchEvents } = props;
  const [isClosed, setIsClosed] = useState(true);
  const [activeEvent, setActiveEvent] =
    useState<ParsedEventItem>(initEventDetails);
  const [showModal, setShowModal] = useState(false);

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
    <>
      <CollapsibleContainer>
        <div
          onClick={() => {
            setIsClosed((prev) => !prev);
          }}
        >
          Event List
        </div>
        {!isClosed && (
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
        )}
      </CollapsibleContainer>
      <Modal isOpen={showModal} onClose={handlecloseModal}>
        <EditEventForm
          eventDetails={activeEvent}
          onSubmit={onEventSubmission}
        />
      </Modal>
    </>
  );
}

export default EventsList;

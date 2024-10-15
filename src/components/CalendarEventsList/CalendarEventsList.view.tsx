import React, { useState } from "react";
import {
  EventItem,
  EventListEntries,
  EventsHeaderItem,
  GroupStats,
  ParsedEventItem,
  ParsedEventListEntries,
  StatsObj,
} from "../../types";
import { eventsHeader } from "../../constants";
import { Router, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import EditEventForm from "../../containers/EditEventForm/EditEventForm.view";
import moment from "moment";
import { groupByEvents } from "../EventForm/utility";

interface Props {
  calendarEvents: ParsedEventListEntries;
  groupedStats: GroupStats;
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
  const { calendarEvents = {}, groupedStats, fetchEvents } = props;
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
      {Object.entries(groupedStats).map((entry) => {
        const [groupName, stats] = entry;
        const { hours, days, events } = stats;
        return (
          <div>
            <span>{`group: ${groupName}`}</span>
            <div>
              <span>{`hours: ${hours}`}</span>
              <span>{`Days: ${days}`}</span>
              <span>{`Events: ${events}`}</span>
            </div>
            <>
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
                {calendarEvents[groupName].map((e: ParsedEventItem) => {
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
            </>
          </div>
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

import React, { useContext, useEffect, useRef, useState } from "react";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal";
import CascadingMenu from "react-cascading-menu";
import { CascadingMenuRef } from "react-cascading-menu/build/src";
import { menuGroup } from "../../data";
import { FormatedSelections } from "react-cascading-menu/build/types";
import { getSelectedCalendarEvents } from "../../apiService/calendarApis";
import {
  ACTION_TYPES,
  useGlobalDispatch,
  useGlobalState,
} from "../../appContext";
import CalendarEventsList from "../../components/CalendarEventsList/CalendarEventsList.view";
import {
  EventItem,
  EventListEntries,
  EventsHeaderItem,
  ParsedEventListEntries,
} from "../../types";
import Dropdown from "../../components/Dropdown";
import { eventsHeader } from "../../constants";
import { groupByEvents } from "../../components/EventForm/utility";
interface Props {}

function Index(props: Props) {
  const {} = props;
  const [isListView, setIsListView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const [leaf, setLeaf];
  const { calendars } = useGlobalState();
  const [calendarEvents, setCalendarEvents] = useState<ParsedEventListEntries>(
    {}
  );
  const ref = useRef<CascadingMenuRef>(null);
  const savedRef = useRef<CascadingMenuRef | null>(null);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [sortBy, setSortBy] = useState<string>();
  const dispatch = useGlobalDispatch();
  const [groupBy, setGroupBy] = useState("topic");

  const handlecloseModal = () => {
    setShowModal(false);
  };
  const fetchEvents = async () => {
    const selections = savedRef.current?.getSelection() || [];
    dispatch({ type: ACTION_TYPES.LOADING, payload: { loading: true } });
    // const leafItems = ref.current?.getAllItemsSelected();
    // console.log("leafItems===1", leafItems, ref.current?.getSelection());

    const calendarEventsRes = await getSelectedCalendarEvents(
      selections.map((e: FormatedSelections | {}) => {
        if ("value" in e && typeof calendars === "object") {
          return { label: e.value, value: calendars[e.value] || "" };
        }
        return {};
      }),
      selections,
      {
        startDate,
        endDate,
        top: 1000,
        orderby: "start/dateTime",
      }
    );
    // groupby events: topic
    const res = groupByEvents(calendarEventsRes, savedRef.current?.leafNodes);
    // console.log("calendarEvents", calendarEvents);
    setCalendarEvents(res);
    dispatch({ type: ACTION_TYPES.LOADING, payload: { loading: false } });
  };

  const handleSubmit = async () => {
    // need an extra ref as the CascadingMenuRef gets null after the modal is closed
    savedRef.current = ref.current;
    setShowModal(false);
    fetchEvents();
  };

  console.log("calendars", calendars);

  const renderItem = (item: EventsHeaderItem, searchVal: string) => {
    return item.label;
  };
  const handleItemClick = (item: EventsHeaderItem) => {
    const orderbyVal = {
      title: "subject",
      start: "start/dateTime",
      description: "bodyPreview",
      timeSpent: "",
      location: "",
      calendar: "",
    };
    setSortBy(orderbyVal[item.value]);
  };
  return (
    <>
      {/* <div className="m-3 p-2 w-auto h-16 overflow-y-scroll border-1 outline-dotted"> */}
      <button
        className="m-2 rounded-md bg-black text-white p-2"
        onClick={() => {
          setShowModal(true);
        }}
      >
        + add
      </button>
      {/* filters */}
      {/* start and end date */}
      <span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
      </span>
      {/* orderby */}
      <Dropdown
        items={eventsHeader}
        handleItemClick={handleItemClick}
        handleSearchChange={() => {}}
        renderItem={renderItem}
      />
      {/* search */}
      <CalendarEventsList
        fetchEvents={fetchEvents}
        calendarEvents={calendarEvents}
      />

      <Modal isOpen={showModal} onClose={handlecloseModal}>
        <CascadingMenu
          selectedItems={savedRef.current?.getSelection()}
          ref={ref}
          menuGroup={menuGroup}
        />
        <button onClick={handleSubmit}>submit</button>
      </Modal>
    </>
  );
}

export default Index;

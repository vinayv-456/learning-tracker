import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import TimeInput from "../DurationInput/DurationInput";
import { Duration, formPayload, ParsedEventItem } from "../../types";
import WebService from "../../apiService/webservice";
import { endPoints } from "../../apiService/endpoints";
import { formatEventPayload } from "./utility";
import CascadingMenu, { CascadingMenuRef } from "react-cascading-menu";
import {
  FormatedSelections,
  MenuGroup,
} from "react-cascading-menu/build/types";
import moment from "moment";

interface EventProps {
  menuGroup: MenuGroup;
  handleFormSubmission: (
    e: React.FormEvent<HTMLFormElement>,
    payload: formPayload
  ) => void;
  formDetails?: ParsedEventItem;
}

function EventForm(props: EventProps) {
  const { menuGroup, handleFormSubmission, formDetails } = props;
  const menuRef = useRef<CascadingMenuRef>(null);
  const [satisfaction, setSatisfaction] = useState<Number>(0);
  const [duration, setDuration] = useState<Duration>({ hours: 0, minutes: 0 });
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // TODO: just for the migration
  const [title, setTitle] = useState<string>("");
  const [calendar, setCalendar] = useState<string>("");

  useEffect(() => {
    if (formDetails && Object.keys(formDetails)) {
      const { title, start, timeSpent, description, calendar } = formDetails;
      // TODO: just for the migration
      setTitle(title);
      setCalendar(calendar);

      setDescription(description);
      const dateFormated = moment(start).format("YYYY-MM-DD");
      setSelectedDate(dateFormated);

      // setting duration
      const hrs = parseInt(timeSpent);
      const mins = (parseFloat(timeSpent) - hrs) * 60;
      setDuration({
        hours: hrs,
        minutes: mins,
      });
    }
  }, [formDetails]);

  const getDuration = (hours: string, minutes: string) => {
    setDuration({
      hours: Number.parseInt(hours),
      minutes: Number.parseInt(minutes),
    });
  };
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const handleSatisfactionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const val = parseInt(inputValue);
    // Check if the input value is a number and within the range of 1 to 5
    if (/^\d+$/.test(inputValue) && val >= 1 && val <= 5) {
      setSatisfaction(val);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleFormSubmission(e, {
      duration,
      selectedDate,
      description,
      satisfaction,
      selections: menuRef.current?.getAllItemsSelected(),
      calendars:
        menuRef.current?.getSelection().map((e: FormatedSelections | {}) => {
          if ("value" in e) {
            return e?.value;
          }
          return "";
        }) || [],
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <span>Event Form</span>
      <div>TODO: just for migration</div>
      <span>title: {title}</span>
      <span>calendar: {calendar}</span>

      <label htmlFor="label">Menu:</label>
      <CascadingMenu ref={menuRef} menuGroup={menuGroup} displayValue="label" />
      <TimeInput duration={duration} getDuration={getDuration} />
      <label htmlFor="label">Satisfaction:</label>
      <input
        type="text"
        value={satisfaction.toString()}
        onChange={handleSatisfactionChange}
      />
      <br />
      <label htmlFor="label">Select a date:</label>
      <input
        type="date"
        id="calendar"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <br />
      <label htmlFor="label">Description:</label>
      <input type="text" value={description} onChange={handleChange} />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default EventForm;

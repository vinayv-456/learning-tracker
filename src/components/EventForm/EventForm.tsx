import React, { useRef, useState, ChangeEvent } from "react";
import TimeInput from "../DurationInput/DurationInput";
import { Duration, formPayload } from "../../types";
import WebService from "../../apiService/webservice";
import { endPoints } from "../../apiService/endpoints";
import { formatEventPayload } from "./utility";
import CascadingMenu, { CascadingMenuRef } from "react-cascading-menu";
import {
  FormatedSelections,
  MenuGroup,
} from "react-cascading-menu/build/types";

interface EventProps {
  menuGroup: MenuGroup;
  handleFormSubmission: (
    e: React.FormEvent<HTMLFormElement>,
    payload: formPayload
  ) => void;
}

function EventForm(props: EventProps) {
  const { menuGroup, handleFormSubmission } = props;
  const menuRef = useRef<CascadingMenuRef>(null);
  const [satisfaction, setSatisfaction] = useState<Number>(0);
  const [duration, setDuration] = useState<Duration>({ hours: 0, minutes: 0 });
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
      <button type="submit">Submit</button>
    </form>
  );
}

export default EventForm;

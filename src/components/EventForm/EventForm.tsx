import React, { useRef, useState, ChangeEvent } from "react";
import CascadingMenu, { CascadingMenuRef } from "../cascadingMenu/src";
import { MenuGroup } from "../cascadingMenu/src/types";
import TimeInput from "../DurationInput/DurationInput";
import { Duration } from "../../types";
import WebService from "../../apiService/webservice";
import { endPoints } from "../../apiService/endpoints";
import { formatEventPayload } from "./utility";

interface Props {
  menuGroup: MenuGroup;
}

function EventForm(props: Props) {
  const { menuGroup } = props;
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
    e.preventDefault();
    const payload = {
      duration,
      selectedDate,
      description,
      satisfaction,
      selections: menuRef.current?.getAllItemsSelected(),
    };
    const formatedPayload = formatEventPayload(payload);
    console.log("form input", payload);
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
    <form onSubmit={handleFormSubmit}>
      <span>Event Form</span>
      <label htmlFor="label">Menu:</label>
      <CascadingMenu
        ref={menuRef}
        isObject={true}
        emptyRecordMsg="No items"
        selectionLimit={10}
        menuGroup={menuGroup}
        isMultiSelection={true}
        displayValue="label"
      />
      <label htmlFor="label">Duration:</label>
      <TimeInput duration={duration} getDuration={getDuration} />
      <label htmlFor="label">Satisfaction:</label>
      <input
        type="text"
        value={satisfaction.toString()}
        onChange={handleSatisfactionChange}
      />
      <label htmlFor="label">Select a date:</label>
      <input
        type="date"
        id="calendar"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <label htmlFor="label">Description:</label>
      <input type="text" value={description} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EventForm;

import React, { useRef, useState, ChangeEvent } from "react";
import CascadingMenu, { CascadingMenuRef } from "../cascadingMenu/src";
import { MenuGroup } from "../cascadingMenu/src/types";
import TimeInput from "../DurationInput/DurationInput";
import { Duration } from "../../types";

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
    console.log("form input", {
      duration,
      selectedDate,
      description,
      satisfaction,
      selection: menuRef.current?.getSelection(),
    });
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

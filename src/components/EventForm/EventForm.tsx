import React, { useRef, useState, ChangeEvent } from "react";
import CascadingMenu, { CascadingMenuRef } from "../cascadingMenu/src";
import { MenuGroup } from "../cascadingMenu/src/types";
import TimeInput from "../DurationInput/DurationInput";
import { Duration, formPayload } from "../../types";
import WebService from "../../apiService/webservice";
import { endPoints } from "../../apiService/endpoints";
import { formatEventPayload } from "./utility";

interface Props {
  menuGroup: MenuGroup;
  handleFormSubmission: (
    e: React.FormEvent<HTMLFormElement>,
    payload: formPayload
  ) => void;
}

function EventForm(props: Props) {
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
    const calendars = menuRef.current
      ?.getSelection()
      ?.reduce((acc: string[], e: {} | { value: string }) => {
        if (Object.keys(e).length) {
          if ("value" in e && e?.value) {
            return [...acc, e.value || ""];
          }
        }
        return acc;
      }, []);

    console.log("aa", menuRef.current?.getSelection());

    handleFormSubmission(e, {
      duration,
      selectedDate,
      description,
      satisfaction,
      selections: menuRef.current?.getAllItemsSelected(),
      calendars,
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

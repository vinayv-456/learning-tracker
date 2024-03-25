import React from "react";
import EventForm from "../../components/EventForm/EventForm";
import { menuGroup } from "./data";

interface Props {}

function AddEventForm(props: Props) {
  return (
    <div>
      <EventForm menuGroup={menuGroup} />
    </div>
  );
}

export default AddEventForm;

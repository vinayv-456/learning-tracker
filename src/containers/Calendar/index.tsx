import React, { useContext, useRef, useState } from "react";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal";
import CascadingMenu, { CascadingMenuRef } from "react-cascading-menu";
import { menuGroup } from "../../data";
import { FormatedSelections } from "react-cascading-menu/build/types";
import { getSelectedCalendarEvents } from "../../apiService/calendarApis";
import { useGlobalState } from "../../appContext";
interface Props {}

function Index(props: Props) {
  const {} = props;
  const [isListView, setIsListView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selections, setSelections] = useState<(FormatedSelections | {})[]>([]);
  const { calendars } = useGlobalState();
  const ref = useRef<CascadingMenuRef>(null);

  const handlecloseModal = () => {
    setShowModal(false);
  };
  const handleSubmit = async () => {
    const selectedItems = ref.current?.getSelection() || [];
    setShowModal(false);
    setSelections(selectedItems);
    const calendarEvents = await getSelectedCalendarEvents(
      selectedItems.map((e: FormatedSelections | {}) => {
        if ("value" in e && typeof calendars === "object") {
          return calendars[e.value] || "";
        }
        return "";
      }),
      selectedItems
    );
    console.log("calendarEvents", calendarEvents);
  };

  console.log("selecti", selections);

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
      {/* </div> */}
      <Table />
      <Modal isOpen={showModal} onClose={handlecloseModal}>
        <CascadingMenu
          selectedItems={selections}
          ref={ref}
          menuGroup={menuGroup}
        />
        <button onClick={handleSubmit}>submit</button>
      </Modal>
    </>
  );
}

export default Index;

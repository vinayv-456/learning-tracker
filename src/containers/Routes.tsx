import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { ProfileContent } from "./profile/ProfileData";
import CalendarList from "./Calendar/List";
import EventForm from "../components/EventForm/EventForm";
import { fetchCalendarList } from "../apiService/calendarApis";
import { ACTION_TYPES, useGlobalDispatch, useGlobalState } from "../appContext";
import { menuGroup } from "./AddEventForm/data";

interface Props {}
function Router(props: Props) {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  useEffect(() => {
    fetchCalendarList()
      .then((res) => {
        dispatch({ type: ACTION_TYPES.FETCH_CALENDAR_LIST, payload: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("res", state);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProfileContent />} />
        <Route path="/calendar" element={<CalendarList />} />
        <Route
          path="/add-event"
          element={
            <EventForm menuGroup={menuGroup} handleFormSubmission={() => {}} />
          }
        />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
}

export default Router;

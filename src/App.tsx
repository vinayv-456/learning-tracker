import React, { useState } from "react";
import "./App.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { SignOutButton } from "./components/auth/singOut";
import { SignIn } from "./components/auth/signIn";
import { ProfileContent } from "./components/profile/ProfileData";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CalendarList from "./components/Calendar/List";

function App() {
  // const isAuthenticated = useIsAuthenticated();
  return (
    <div className="App">
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProfileContent />} />
            <Route path="/calendar" element={<CalendarList />} />
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Route>
        </Routes>
      </AuthenticatedTemplate>
    </div>
  );
}

export default App;

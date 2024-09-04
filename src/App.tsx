import React, { useState } from "react";
import "./App.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { SignOutButton } from "./containers/auth/singOut";
import { SignIn } from "./containers/auth/signIn";
import { ProfileContent } from "./containers/profile/ProfileData";
import { Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout";
import CalendarList from "./containers/Calendar/List";
import EventForm from "./containers/AddEventForm/AddEventForm";
import Router from "./containers/Routes";
import { GlobalProvider } from "./appContext";

function App() {
  // const isAuthenticated = useIsAuthenticated();
  return (
    <div className="App">
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <GlobalProvider>
          <Router />
        </GlobalProvider>
      </AuthenticatedTemplate>
    </div>
  );
}

export default App;

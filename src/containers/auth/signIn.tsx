import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../apiService/authConfig";
import { manageAccessTokenToHeader } from "../../apiService/webservice";
import "./signIn.css";
/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package
 */

export const SignIn = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: string) => {
    instance
      .loginPopup(loginRequest)
      .then((res) => {
        console.log("res", res.accessToken);
        manageAccessTokenToHeader(res.accessToken);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
  return (
    <div className="container ml-auto" title="Sign In">
      <div className="body">
        <h5>
          <center>Learning Tracker</center>
        </h5>
        <div className="bg-red-400">
          Learning Tracker simplifies learning event management with cascading
          menus for adding topics, sub-topics, descriptions, and hours spent. It
          offers grouping options on the list page and visualizes data against
          hours spent, aiding users in tracking their learning activities
          efficiently.
        </div>
        <button onClick={() => handleLogin("popup")}>Sign in</button>
      </div>
    </div>
  );
};

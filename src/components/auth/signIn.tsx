import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../apiService/authConfig";
import { manageAccessTokenToHeader } from "../../apiService/webservice";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package
 */

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: string) => {
    if (loginType === "popup") {
      instance
        .loginPopup(loginRequest)
        .then((res) => {
          console.log("res", res.accessToken);
          manageAccessTokenToHeader(res.accessToken);
        })
        .catch((e: any) => {
          console.log(e);
        });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e: any) => {
        console.log(e);
      });
    }
  };
  return (
    <div className="ml-auto" title="Sign In">
      <div onClick={() => handleLogin("popup")}>Sign in using Popup</div>
      {/* <div onClick={() => handleLogin("redirect")}>Sign in using Redirect</div> */}
    </div>
  );
};

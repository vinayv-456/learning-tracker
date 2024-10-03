import React from "react";
import { useMsal } from "@azure/msal-react";
import { manageAccessTokenToHeader } from "../../apiService/webservice";

/**
 * Renders a sign out button
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType: string) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
      manageAccessTokenToHeader("");
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <div className="p-3 ml-4" title="Sign Out">
      <button onClick={() => handleLogout("popup")}>Sign out</button>
      {/* <button onClick={() => handleLogout("redirect")}>
        Sign out using Redirect
      </button> */}
    </div>
  );
};

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
    <div className="ml-auto" title="Sign Out">
      <div onClick={() => handleLogout("popup")}>Sign out</div>
      {/* <div onClick={() => handleLogout("redirect")}>
        Sign out using Redirect
      </div> */}
    </div>
  );
};

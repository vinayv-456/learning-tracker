import React, { useState } from "react";
import "./App.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { SignOutButton } from "./components/auth/singOut";
import { SignInButton } from "./components/auth/signIn";
import { ProfileContent, ProfileData } from "./components/profile/ProfileData";

function App() {
  const isAuthenticated = useIsAuthenticated();
  console.log("aa", process.env.TENANT_ID);
  return (
    <div className="App">
      {/* header */}
      {isAuthenticated ? <SignOutButton /> : <SignInButton />}

      {/* body */}
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h5>
          <center>Please sign-in to see your profile information.</center>
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;

// @ts-ignore
import { createRoot } from "react-dom";
import React from "react";
import "./index.css";
import App from "./App";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./apiService/authConfig";
import { MsalProvider } from "@azure/msal-react";
import { BrowserRouter } from "react-router-dom";

const msalInstance = new PublicClientApplication(msalConfig);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>
);

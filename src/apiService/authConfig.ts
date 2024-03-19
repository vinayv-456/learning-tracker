import { LogLevel } from "@azure/msal-browser";

interface MsalConfig {
  auth: {
    clientId: string;
    authority: string;
    redirectUri: string;
  };
  cache: {
    cacheLocation: string;
    storeAuthStateInCookie: boolean;
  };
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ) => void;
    };
  };
}

export const msalConfig: MsalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    redirectUri: "http://localhost:8080",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

interface LoginRequest {
  scopes: string[];
}

export const loginRequest: LoginRequest = {
  scopes: [
    "User.Read",
    "Calendars.ReadBasic",
    "Calendars.Read",
    "Calendars.ReadWrite",
  ],
};

import React, { ReactNode } from "react";
import { createContext, useContext, useReducer } from "react";

export interface Obj {
  [key: string]: string;
}

interface State {
  [key: string]: string | boolean;
}

interface Action {
  type: string;
  payload: { [key: string]: string | boolean };
}

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_CALENDAR_LIST:
      return { ...state, calendars: action.payload.calendars };
    case ACTION_TYPES.LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
};

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};

export const useGlobalDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useGlobalDispatch must be used within a GlobalProvider");
  }
  return context;
};

export const ACTION_TYPES = {
  FETCH_CALENDAR_LIST: "FETCH_CALENDAR_LIST",
  LOADING: "LOADING",
};

import React, { createContext, useCallback, useEffect, useLayoutEffect, useReducer } from "react";
import { ACTIONS, reducer } from "./reducer";
import { globalState } from "./global-state";

const { ipcRenderer } = window.require("electron");

let AppWindowId = null,
    AppWindow = null;

ipcRenderer.once("app-window-details", (e, data) => {
    console.log({
        message : "we have retrieved the app window details",
        appWindowDetails : data,
    });
    AppWindowId = data.AppWindowId;
    AppWindow = data.AppWindow;
});

const GlobalStateContext = createContext(null);

const GlobalStateProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, {...globalState, AppWindowId, AppWindow});


    return (
        <GlobalStateContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalStateContext.Provider>
    );
    
}
    
    
export {GlobalStateProvider, GlobalStateContext};
    



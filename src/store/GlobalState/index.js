import React, { createContext, useCallback, useEffect, useLayoutEffect, useReducer } from "react";
import { ACTIONS, reducer } from "./reducer";
import { globalState } from "./global-state";

const { ipcRenderer } = window.require("electron");

let appWindowId = null;

ipcRenderer.once("app-window-id", (e, data) => {
    console.log({
        message : "we have retrieved the app window id",
        windowId : data,
    });
    appWindowId = data;
});

const GlobalStateContext = createContext(null);

const GlobalStateProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, globalState);

    const checkAppWindowId = useCallback(() => {
        if(appWindowId) {
            dispatch({type : ACTIONS.SET_APP_WINDOW_ID, payload : appWindowId})
        } else  {
            checkAppWindowId();
        }
    });

    useEffect(() => {
        checkAppWindowId();
    }, []);

    return (
        <GlobalStateContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalStateContext.Provider>
    );
    
}
    
    
export {GlobalStateProvider, GlobalStateContext};
    



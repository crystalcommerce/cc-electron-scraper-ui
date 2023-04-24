import React, { createContext, useCallback, useEffect, useLayoutEffect, useReducer } from "react";
import { reducer } from "./reducer";

const { ipcRenderer } = window.require("electron");

let appWindowId = null;

ipcRenderer.once("app-window-id", (e, data) => {
    console.log({
        message : "we have retrieved the app window id",
        windowId : data,
    });
    appWindowId = data;
});

const AppWindowsContext = createContext(null);

const initialState = {
    browserFrameElement : null,
    browserFrameElementHidden : false,
    browserFrameDimensionsUpdate : 0,
    mainComponentClassName : "with-side-bar", // with-side-bar if sidebarHidden false
    sidebarHidden : false,
};

const AppWindowsProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const checkAppWindowId = useCallback(() => {
        if(appWindowId) {
            dispatch({type : "set-app-window-id", payload : appWindowId})
        } else  {
            checkAppWindowId();
        }
    });

    useEffect(() => {
        checkAppWindowId();
    }, []);

    return (
        <AppWindowsContext.Provider value={[state, dispatch]}>
            {children}
        </AppWindowsContext.Provider>
    );
    
}
    
    
export {AppWindowsProvider, AppWindowsContext};
    



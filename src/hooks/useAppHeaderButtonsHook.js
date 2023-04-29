import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";

const {ipcRenderer} = window.require("electron");


export default function useAppButtonHandlers()   {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const [variant, setVariant] = useState("default");
    
    const closeButtonMouseOverHandler = (e) => {
        setVariant(state => "contained");
    };

    const closeButtonMouseOutHandler = () => {
        setVariant(state => "default");
    };

    const closeAppHandler = (e) => {
        e.preventDefault();

        ipcRenderer.send("close-application", {
            message : "Closing the application",
            windowId : GlobalState.AppWindowId,
        })
    };

    const minimizeAppHandler = (e) => {
        ipcRenderer.send("minimize-application", {
            message : "Minimizing the application",
            windowId : GlobalState.AppWindowId,
        })
    };
    

    const fullScreenClickHandler = (e) => {

        ipcRenderer.send("full-screen-application", {
            message : "fullScreen App the application",
            windowId : GlobalState.AppWindowId,
            state : !GlobalState.AppWindow.isOnFullScreen,
        });
    };

    const setFullScreenState = (e, data) => {
        console.log(data);
        dispatch({
            type : ACTIONS.SET_APP_WINDOW_DETAILS,
            payload : data
        });
    }

    useEffect(() => {
        
        ipcRenderer.on("set-full-screen-state", setFullScreenState);

        return () => ipcRenderer.removeListener("set-full-screen-state", setFullScreenState);

    }, [GlobalState]);

    return {fullScreenClickHandler, closeButtonMouseOutHandler, closeButtonMouseOverHandler, closeAppHandler, minimizeAppHandler, variant}
}
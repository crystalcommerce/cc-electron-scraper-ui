import React, { useContext, useState } from "react";
import { AppWindowsContext } from "../store/AppWindows";
import { ACTIONS } from "../store/AppWindows/reducer";

const {ipcRenderer} = window.require("electron");

export default function useAppButtonHandlers()   {

    const [AppWindowsState] = useContext(AppWindowsContext);

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
            windowId : AppWindowsState.appWindowId,
        })
    };

    const minimizeAppHandler = (e) => {
        ipcRenderer.send("minimize-application", {
            message : "Minimizing the application",
            windowId : AppWindowsState.appWindowId,
        })
    };
    

    const [fullScreen, setFullScreen] = useState(false);

    const fullScreenClickHandler = (e) => {
        
        setFullScreen(prev => {
            ipcRenderer.send("full-screen-application", {
                message : "fullScreen App the application",
                windowId : AppWindowsState.appWindowId,
                state : !prev
            });

            return !prev;
        });
    }

    return {fullScreenClickHandler, closeButtonMouseOutHandler, closeButtonMouseOverHandler, closeAppHandler, minimizeAppHandler, fullScreen, variant}
}
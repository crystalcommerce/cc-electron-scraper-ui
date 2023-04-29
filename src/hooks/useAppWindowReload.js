import React, {useEffect, useContext, useState} from "react";
import { GlobalStateContext } from "../store/GlobalState";

const {ipcRenderer} = window.require("electron");

export default function useAppWindowReload() {

    const [appWindowId, setAppWindowId] = useState(null);

    const [ GlobalState ] = useContext(GlobalStateContext);

    const updateFrameWindows = (e) => {

        if(appWindowId) {
            ipcRenderer.send("reload-app-window", appWindowId);
        }
    }

    useEffect(() => {
        
        if(GlobalState.AppWindowId) {
            setAppWindowId(prev => GlobalState.AppWindowId);
        }

    }, [GlobalState]);

    useEffect(() => {

        window.addEventListener("beforeunload", updateFrameWindows);

        return () => window.removeEventListener("beforeunload", updateFrameWindows);

    }, [appWindowId]);

}
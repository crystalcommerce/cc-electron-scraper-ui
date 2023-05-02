import React, {useEffect, useContext, useState} from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";

const {ipcRenderer} = window.require("electron");

export default function useAppWindowReload() {

    const [appWindowId, setAppWindowId] = useState(null);

    const [ GlobalState, dispatch ] = useContext(GlobalStateContext);

    const updateFrameWindows = () => {

        document.removeEventListener("keydown", bindReloadKeys);

        console.log("we are reloading...");

        if(appWindowId) {

            dispatch({type : ACTIONS.SET_APP_LOADING_STATE, payload : true});

            dispatch({type : ACTIONS.CLEAR_FRAME_WINDOWS});
            
            ipcRenderer.send("reload-app-window", appWindowId);

        }
    }

    const bindReloadKeys = (event) => {
        if (event.ctrlKey && event.code === 'KeyR') {
            updateFrameWindows()
            event.preventDefault()
        } else if (event.ctrlKey && event.shiftKey && event.code === 'KeyR') {
            updateFrameWindows()
            event.preventDefault()
        }
    }

    const appReadyHandler = (e, data) => {
        console.log(data.message);
        setTimeout(() => {
            // dispatch({type : ACTIONS.SET_APP_LOADING_STATE, payload : false});

            location.reload();
        }, 1500);
        
    }

    useEffect(() => {
        
        if(GlobalState.AppWindowId) {
            setAppWindowId(prev => GlobalState.AppWindowId);
        }

    }, [GlobalState]);

    useEffect(() => {

        ipcRenderer.on("app-is-ready", appReadyHandler);

        document.addEventListener("keydown", bindReloadKeys);

        return () => {
            document.removeEventListener("keydown", bindReloadKeys);
            ipcRenderer.removeListener("app-is-ready",appReadyHandler);
        }

    }, [appWindowId]);


}
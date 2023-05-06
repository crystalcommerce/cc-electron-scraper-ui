import React, {useState, useEffect, useContext} from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";
import useElementDimensions from "./useElementDimensions";

const { ipcRenderer } = window.require("electron");

export default function useFrameWindowHook(componentId, cardRef)   {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const {getDimensions} = useElementDimensions();

    const setFrameWindow = () => {

        if(GlobalState.AppWindow.isLoading)   {
            return;
        }

        ipcRenderer.send("set-frame-dimensions", {
            AppWindowId : GlobalState.AppWindowId,
            componentId,
            dimensions : getDimensions(cardRef.current),
            message : "Triggered in frame window hook"
        });
        
    }

    const eventCallback = (e) => {
        setFrameWindow();
    }

    // update from the backend;
    const frameWindowUpdateHandler = (e, data) => {
        // setIsUpdating(false);
        if(GlobalState.AppWindowId === data.payload.AppWindowId && data.payload.componentId === componentId)    {
            dispatch({
                type : ACTIONS.UPDATE_FRAME_WINDOWS, 
                payload : {
                    FrameWindows : [
                        {
                            AppWindowId : GlobalState.AppWindowId,
                            componentId,
                            hidden : false,
                            isReady : true,
                        }
                    ]
                }
            });
        }
    }

    useEffect(() => {

        const el = cardRef ? cardRef.current : null;
        
        // register the component to the global state;
        dispatch({
            type : ACTIONS.UPDATE_FRAME_WINDOWS, 
            payload : {
                FrameWindows : [
                    {
                        AppWindowId : GlobalState.AppWindowId,
                        element : cardRef.current,
                        componentId,
                        hidden : true,
                        dimensions : getDimensions(el),
                    }
                ]
            }
        });

        setFrameWindow();
        
        // update the global state on unload;
        return () => {
            dispatch({
                type : ACTIONS.UPDATE_FRAME_WINDOWS, 
                payload : {
                    FrameWindows : [
                        {
                            AppWindowId : GlobalState.AppWindowId,
                            element : null,
                            componentId,
                            hidden : true,
                            isReady : false,
                            dimensions : getDimensions(el),
                        }
                    ]
                }
            });
            
        }

        
        

    }, [cardRef]);
    
    useEffect(() => {

        window.addEventListener("resize", eventCallback);
        window.addEventListener("load", eventCallback);

        // get the window details from the backend;
        ipcRenderer.on("frame-window-component-details", frameWindowUpdateHandler);

        return () => {
            window.removeEventListener("resize", eventCallback);
            window.removeEventListener("load", eventCallback);
            // remove the listener on unload
            ipcRenderer.removeListener("frame-window-component-details", frameWindowUpdateHandler);

            setFrameWindow();
        };

    }, []);


}
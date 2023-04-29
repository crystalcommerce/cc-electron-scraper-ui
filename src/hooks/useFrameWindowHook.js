import React, {useState, useEffect, useContext} from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";
import useElementDimensions from "./useElementDimensions";

const { ipcRenderer } = window.require("electron");

export default function useFrameWindowHook(componentId, cardRef)   {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const {getDimensions} = useElementDimensions();

    const getFrameWindow = () => {

        const foundFrame = GlobalState.FrameWindows.find(item => item.componentId === componentId);

        const el = cardRef ? cardRef.current : null;

        if(foundFrame) {
            ipcRenderer.send("get-frame-window", {
                browserFrameDimensions : getDimensions(el),
                parentWindowId : GlobalState.AppWindowId,
                windowId : componentId,
            });

        }
        
    }

    // update from the backend;
    const getFrameWindowUpdate = (e, data) => {
        // console.log(data);
    }

    useEffect(() => {

        const el = cardRef ? cardRef.current : null;
        
        // register the component to the global state;
        dispatch({
            type : ACTIONS.UPDATE_FRAME_WINDOWS, 
            payload : {
                FrameWindows : [
                    {
                        parentWindowId : GlobalState.AppWindowId,
                        element : cardRef.current,
                        windowId : componentId,
                        componentId,
                        hidden : false,
                        dimensions : getDimensions(el),
                    }
                ]
            }
        });

        
        // update the global state on unload;
        return () => {
            dispatch({
                type : ACTIONS.UPDATE_FRAME_WINDOWS, 
                payload : {
                    FrameWindows : [
                        {
                            parentWindowId : GlobalState.AppWindowId,
                            element : null,
                            windowId : componentId,
                            componentId,
                            hidden : true,
                            dimensions : getDimensions(el),
                        }
                    ]
                }
            });
            
        }

    }, [cardRef]);


    useEffect(() => {

        getFrameWindow();

        window.addEventListener("resize", getFrameWindow);
        window.addEventListener("load", getFrameWindow);

        return () => {
            getFrameWindow();
            window.removeEventListener("resize", getFrameWindow);
            window.removeEventListener("load", getFrameWindow);
        };

    }, [GlobalState]);
    
    // logging the global state;
    useEffect(() => {

        // get the window details from the backend;
        ipcRenderer.on("frame-window-details", getFrameWindowUpdate);

        return () => {
            // remove the listener on unload
            ipcRenderer.removeListener("frame-window-details", getFrameWindowUpdate);
        }

    }, []);


}
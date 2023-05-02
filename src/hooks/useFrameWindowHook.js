import React, {useState, useEffect, useContext} from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";
import useElementDimensions from "./useElementDimensions";

const { ipcRenderer } = window.require("electron");

export default function useFrameWindowHook(componentId, cardRef)   {

    const [frameUpdated, setFrameUpdated] = useState(false);

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const {getDimensions} = useElementDimensions();

    const getFrameWindow = (isHidden = false) => {


        if(GlobalState.AppWindow.isLoading)   {
            return;
        }

        const foundFrame = GlobalState.FrameWindows.find(item => item.componentId === componentId);

        const el = cardRef ? cardRef.current : null;

        if(foundFrame) {
            ipcRenderer.send("get-frame-window", {
                browserFrameDimensions : getDimensions(el),
                parentWindowId : GlobalState.AppWindowId,
                windowId : componentId,
                isHidden : isHidden,
            });
        }
        
    }

    const eventCallback = (e, isHidden = false) => {
        getFrameWindow(isHidden);
    }

    // update from the backend;
    const getFrameWindowUpdate = (e, data) => {
        // setIsUpdating(false);
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

        const foundFrame = GlobalState.FrameWindows.find(item => item.componentId === componentId);

        if(foundFrame && !foundFrame.hidden && !frameUpdated)  {
            getFrameWindow();
            setFrameUpdated(true);
        }

    }, [GlobalState, frameUpdated]);

    useEffect(() => {

        

        window.addEventListener("resize", eventCallback);
        window.addEventListener("load", eventCallback);

        // get the window details from the backend;
        ipcRenderer.on("frame-window-details", getFrameWindowUpdate);

        return () => {
            window.removeEventListener("resize", eventCallback);
            window.removeEventListener("load", eventCallback);
            // remove the listener on unload
            ipcRenderer.removeListener("frame-window-details", getFrameWindowUpdate);

            getFrameWindow(true);
        };

    }, []);


}
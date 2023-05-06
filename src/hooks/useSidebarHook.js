import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";
import useElementDimensions from "./useElementDimensions";

const {ipcRenderer} = window.require("electron");

export default function useSidebarHook()    {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const { getDimensions } = useElementDimensions();

    const [activeFrameWindow, setActiveFrameWindow] = useState(null);

    const showSidebarClickHandler = (e) => {

        if(GlobalState.Components.Sidebar.hidden)   {

            dispatch({
                type : ACTIONS.UPDATE_COMPONENTS/* SET_SIDEBAR_HIDDEN */, 
                payload : {
                    Sidebar : {
                        hidden : false,
                    },
                    Main : {
                        toggleClassName : "with-side-bar",
                    }
                }
            });
        } else  {

            dispatch({
                type : ACTIONS.UPDATE_COMPONENTS/* SET_SIDEBAR_HIDDEN */, 
                payload : {
                    Sidebar : {
                        hidden : true,
                    },
                    Main : {
                        toggleClassName : "",
                    }
                }
            });
        }
    }

    const animationCallback = (count) => {
        
        if(activeFrameWindow && activeFrameWindow.element) {

            ipcRenderer.send("set-frame-dimensions", {
                AppWindowId : activeFrameWindow.AppWindowId,
                componentId : activeFrameWindow.componentId,
                dimensions : getDimensions(activeFrameWindow.element),
            });

        }
    }

    useEffect(() => {
        if(!activeFrameWindow)  {
            setActiveFrameWindow(prev => GlobalState.FrameWindows.find(item => !item.hidden));
        }

    }, [GlobalState]);

    return {showSidebarClickHandler, animationCallback};

}
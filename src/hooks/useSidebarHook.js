import React, { useContext } from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";
import useElementDimensions from "./useElementDimensions";

const {ipcRenderer} = window.require("electron");

export default function useSidebarHook()    {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const { getDimensions } = useElementDimensions();

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

    const animationCallback = (isHidden = true) => {
        const activeFrameWindow = GlobalState.FrameWindows.find(item => !item.hidden);

        if(activeFrameWindow && activeFrameWindow.element) {

            ipcRenderer.send("get-frame-window", {
                browserFrameDimensions : getDimensions(activeFrameWindow.element),
                parentWindowId : GlobalState.AppWindowId,
                windowId : activeFrameWindow.componentId,
                isHidden,
            });

        }
    }

    return {showSidebarClickHandler, animationCallback};

}
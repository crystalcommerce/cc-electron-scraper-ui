import React, { useContext } from "react";
import { GlobalStateContext } from "../store/GlobalState";
import useElementDimensions from "./useElementDimensions";

const {ipcRenderer} = window.require("electron");

export default function useMainHook()   {

    const [GlobalState] = useContext(GlobalStateContext);
    const { getDimensions } = useElementDimensions();

    const animationCallback = () => {
        const activeFrameWindow = GlobalState.FrameWindows.find(item => !item.hidden);

        if(activeFrameWindow && activeFrameWindow.element) {
            ipcRenderer.send("get-frame-window", {
                browserFrameDimensions : getDimensions(activeFrameWindow.element),
                parentWindowId : GlobalState.AppWindowId,
                windowId : activeFrameWindow.componentId,
            });

        }
    }

    return {animationCallback};

}
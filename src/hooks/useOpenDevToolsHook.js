import React, { useContext, useState, useEffect } from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";

const {ipcRenderer} = window.require("electron");

export default function useOpenDevToolsHook(browserWindowId) {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const [activeTab, setActiveTab] = useState(null);

    const [opened, setOpened] = useState(false);

    const openDevToolsClickHandler = (e) => {
        e.preventDefault();

        setOpened(prev => {

            ipcRenderer.send("browser-dev-tools", {
                action : prev ? "close" : "open",
                payload : {
                    AppWindowId : activeTab.AppWindowId,
                    browserWindowId : activeTab.browserWindowId,
                    componentId : activeTab.componentId,
                }
            });
            return !prev;

        });
        
    }

    useEffect(() => {
        setActiveTab(prev => GlobalState.BrowserTabs.find(item => item.browserWindowId === browserWindowId))
    }, [GlobalState]);

    useEffect(() => {

        // setOpened(prev => activeTab.devToolsOpened || false);

    }, [activeTab])



    return {openDevToolsClickHandler, opened};

}
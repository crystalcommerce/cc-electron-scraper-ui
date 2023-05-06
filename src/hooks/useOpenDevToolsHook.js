import React, { useContext, useState, useEffect } from "react";
import { GlobalStateContext } from "../store/GlobalState";

const {ipcRenderer} = window.require("electron");

export default function useOpenDevTools() {

    const [GlobalState] = useContext(GlobalStateContext);

    const [activeTab, setActiveTab] = useState(null);

    const [opened, setOpened] = useState(false);

    const openDevToolsClickHandler = (e) => {
        e.preventDefault();

        setOpened(prev => {

            if(prev)    {
                ipcRenderer.send("browser-dev-tools", {
                    action : "close",
                    payload : {
                        AppWindowId : activeTab.AppWindowId,
                        browserWindowId : activeTab.browserWindowId,
                        componentId : activeTab.componentId,
                    }
                });
            } else  {
                ipcRenderer.send("browser-dev-tools", {
                    action : "open",
                    payload : {
                        AppWindowId : activeTab.AppWindowId,
                        browserWindowId : activeTab.browserWindowId,
                        componentId : activeTab.componentId,
                    }
                });
            }

            return !prev
        });
        

    }

    useEffect(() => {
        
        setActiveTab(prev => GlobalState.BrowserTabs.find(item => item.isActive));

    }, [GlobalState]);



    return {openDevToolsClickHandler, opened};

}
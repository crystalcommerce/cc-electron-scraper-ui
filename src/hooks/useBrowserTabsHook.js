import React, { useContext, useEffect } from "react";
import { ACTIONS } from "../store/GlobalState/reducer";
import { GlobalStateContext } from "../store/GlobalState";
import { debounce, generateUuid } from "../utilities";

const { ipcRenderer } = window.require("electron");

export default function useBrowserTabsHook()    {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const createBrowserWindowTab = () => {

        let activeFrame = GlobalState.FrameWindows.find(item => !item.hidden),
            windowObject = null;

        if(activeFrame) {
            let parentWindowId = activeFrame.componentId,
                browserWindowId = generateUuid(),
                url = "",
                isActive = true,
                label = "New Tab";

            windowObject =  {
                browserWindowId,
                parentWindowId,
                url,
                isActive,
                label,
            };
        }

        return windowObject;
           
    };

    const addNewBrowserTab = (e) => {
        let browserWindow = createBrowserWindowTab();

        if(browserWindow)   {
            dispatch({
                type : ACTIONS.UPDATE_BROWSER_TABS,
                payload : {
                    operation : "add",
                    tab : browserWindow,
                }
            });
        }
        
    };

    const removeBrowserTab = (e, browserWindowId) => {
        dispatch({
            type : ACTIONS.UPDATE_BROWSER_TABS,
            payload : {
                operation : "remove",
                tab : {
                    browserWindowId,
                },
            }
        });
    };

    const setActiveBrowserTab = (e, browserWindowId) => {
        dispatch({
            type : ACTIONS.UPDATE_BROWSER_TABS,
            payload : {
                operation : "activate",
                tab : {
                    browserWindowId,
                    isActive : true,
                },
            }
        });
    };


    useEffect(() => {

        if(!GlobalState.BrowserTabs.length) {

            addNewBrowserTab();

        }


    }, [GlobalState]);


    return { addNewBrowserTab, setActiveBrowserTab, removeBrowserTab };

}


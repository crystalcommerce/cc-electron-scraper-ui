import React, { useContext, useEffect } from "react";
import { ACTIONS } from "../store/GlobalState/reducer";
import { GlobalStateContext } from "../store/GlobalState";
import { debounce, generateUuid } from "../utilities";

const { ipcRenderer } = window.require("electron");

export default function useBrowserTabsHook()    {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    // const []

    const createBrowserWindowTab = () => {

        let activeFrame = GlobalState.FrameWindows.find(item => !item.hidden),
            windowObject = null;

        // console.log(GlobalState.FrameWindows);

        if(activeFrame && activeFrame.isReady) {
            let parentWindowId = activeFrame.componentId,
                browserWindowId = generateUuid(),
                url = "",
                isActive = true,
                disabled = true,
                label = "New Tab";

            windowObject =  {
                browserWindowId,
                parentWindowId,
                url,
                isActive,
                disabled,
                label,
            };
        }

        return windowObject;
           
    };


    // ADD BROWSER TAB
    const addNewBrowserTab = (e) => {
        let browserWindow = createBrowserWindowTab();

        if(browserWindow)   {

            dispatch({
                type : ACTIONS.SET_MULTI_STATE_PROPERTIES,
                payload : [
                    
                    {
                        type : ACTIONS.UPDATE_BROWSER_TABS,
                        payload : {
                            operation : "add",
                            tab : browserWindow,
                        }
                    },
                    {
                        type : ACTIONS.UPDATE_BROWSER_TABS,
                        payload : {
                            operation : "disable-add-button",
                            disabled : true,
                        }
                    },
                    {
                        type : ACTIONS.UPDATE_BROWSER_TABS,
                        payload : {
                            operation : "disable-all-buttons",
                        }
                    },
                    {
                        type : ACTIONS.UPDATE_COMPONENTS,
                        payload : {
                            BrowserAddressBar : {
                                disabled : true,
                            }
                        }
                    }
                ]
            });
        }

        ipcRenderer.send("create-browser-window", {
            action : "create-window",
            payload : browserWindow,
        });
        
    };

    // add event from electron
    const browserCreatedElectronEventHandler = (e, data) => {

        // console.log(data);
        dispatch({
            type : ACTIONS.SET_MULTI_STATE_PROPERTIES,
            payload : [
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "disable-add-button",
                        disabled : false,
                    }
                },
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "enable-all-buttons",
                    }
                },
                {
                    type : ACTIONS.UPDATE_COMPONENTS,
                    payload : {
                        BrowserAddressBar : {
                            disabled : false,
                        }
                    }
                }
            ]
        });        
        GlobalState.Components.BrowserAddressBar.element.focus();
    }


    // CLOSE BROWSER TAB
    const removeBrowserTab = (e, browserWindowId) => {
        dispatch({
            type : ACTIONS.SET_MULTI_STATE_PROPERTIES,
            payload : [
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "disable-add-button",
                        disabled : true,
                    }
                },
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "disable-all-buttons",
                    }
                }
            ]
        });
        ipcRenderer.send("close-browser-window", {
            action : "close-window",
            payload : {
                browserWindowId,
            },
        });
    };

    // close event from electron
    const browserCloseElectronEventHandler = (e, data) => {
        console.log(data);
        dispatch({
            type : ACTIONS.SET_MULTI_STATE_PROPERTIES,
            payload : [
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "disable-add-button",
                        disabled : false,
                    }
                },
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "enable-all-buttons",
                    }
                },
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "remove",
                        tab : {
                            browserWindowId : data.payload.browserWindowId,
                        },
                    }
                }
            ]
        });   

    }


    // SET ACTIVE
    const setActiveBrowserTab = (e, browserWindowId) => {
        dispatch({
            type : ACTIONS.SET_MULTI_STATE_PROPERTIES,
            payload : [
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "disable-add-button",
                        disabled : true,
                    }
                },
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "disable-all-buttons",
                    }
                }
            ]
        });
        
        ipcRenderer.send("set-active-browser-window", {
            action : "set-active-browser-window",
            payload : {
                browserWindowId,
            },
        });
    };

    // set active electron event;
    const setActiveBrowserTabElectronEventHandler = (e, data) => {
        dispatch({
            type : ACTIONS.SET_MULTI_STATE_PROPERTIES,
            payload : [
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "disable-add-button",
                        disabled : false,
                    }
                },
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "enable-all-buttons",
                    }
                },
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "activate",
                        tab : {
                            browserWindowId : data.payload.browserWindowId,
                            isActive : true,
                        },
                    }
                }
            ]
        });   

        GlobalState.Components.BrowserAddressBar.element.focus();
    }


    // adds one tab if everything has closed...
    useEffect(() => {

        if(!GlobalState.BrowserTabs.length) {
            addNewBrowserTab();
        }
        
    }, [GlobalState]);

    // setting and unsetting the event listeners from electron.
    useEffect(() => {
        
        // event listeners from electron;

        // add
        ipcRenderer.on("browser-window-created", browserCreatedElectronEventHandler);

        // remove
        ipcRenderer.on("browser-window-closed", browserCloseElectronEventHandler);

        // set active tab
        ipcRenderer.on("browser-window-set-active", setActiveBrowserTabElectronEventHandler);


        // cleanup
        return () => {
            ipcRenderer.removeListener("browser-window-created", browserCreatedElectronEventHandler);
            ipcRenderer.removeListener("browser-window-closed", browserCloseElectronEventHandler);
            ipcRenderer.removeListener("browser-window-set-active", setActiveBrowserTabElectronEventHandler);
        }

    }, []);


    return { addNewBrowserTab, setActiveBrowserTab, removeBrowserTab };

}


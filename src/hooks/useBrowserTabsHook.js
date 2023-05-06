import React, { useState, useContext, useEffect } from "react";
import { ACTIONS } from "../store/GlobalState/reducer";
import { GlobalStateContext } from "../store/GlobalState";
import { debounce, generateUuid } from "../utilities";

const { ipcRenderer } = window.require("electron");

export default function useBrowserTabsHook()    {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const [activeFrame, setActiveFrame] = useState(null);

    const createBrowserWindowTab = () => {

        let windowObject = null;

        if(activeFrame && activeFrame.isReady) {
            let AppWindowId = GlobalState.AppWindowId,
                componentId = activeFrame.componentId,
                browserWindowId = generateUuid(),
                url = "",
                isActive = true,
                disabled = true,
                label = "New Tab";

            windowObject =  {
                AppWindowId,
                componentId,
                browserWindowId,
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

            ipcRenderer.send("create-browser-window", {
                action : "create-window",
                payload : browserWindow,
            });

        }
        
    };

    // add event from electron
    const browserCreatedElectronEventHandler = (e, data) => {

        let activeFrameElement = GlobalState.FrameWindows.find(item => !item.hidden && item.isReady);

        if(data.payload.AppWindowId === activeFrameElement.AppWindowId && activeFrameElement.componentId === data.payload.componentId) {
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
                        callback : (browserWindow) => {
                            if(browserWindow)   {
                                ipcRenderer.send("set-active-browser-window", {
                                    action : "set-active-browser-window",
                                    payload : {
                                        browserWindowId : browserWindow.browserWindowId,
                                    },
                                });
                            } else  {
                                console.log("adding new browser tab...")
                                addNewBrowserTab();
                            }
                        }
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
                    },
                    
                },
                {
                    type : ACTIONS.UPDATE_COMPONENTS,
                    payload : {
                        BrowserAddressBar : {
                            isBlank : true,
                        }
                    }
                }
            ]
        });
        ipcRenderer.send("set-active-browser-window", {
            action : "set-active-browser-window",
            payload : {
                browserWindowId : browserWindowId,
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
                    type : ACTIONS.UPDATE_COMPONENTS,
                    payload : {
                        BrowserAddressBar : {
                            isBlank : false,
                        }
                    }
                },
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "activate",
                        tab : {
                            browserWindowId : data.payload.browserWindowId,
                            isActive : true,
                        }
                    }
                }
            ]
        });   

        GlobalState.Components.BrowserAddressBar.element.focus();
    }

    const updateBrowserTabElectronEventHandler = (e, data) => {

        let {payload} = data;

        dispatch({
            type : ACTIONS.UPDATE_BROWSER_TABS,
            payload : {
                operation : "update-browser-tab-info",
                tab : {
                    ...payload
                }
            }
        });

    }


    // adds one tab if everything has closed...
    useEffect(() => {

        setActiveFrame(prev => GlobalState.FrameWindows.find(item => !item.hidden));
        // console.log(GlobalState.FrameWindows);
    }, [GlobalState]);

    useEffect(() => {
        
        if(!GlobalState.BrowserTabs.length) {
            addNewBrowserTab();
        }

    }, [activeFrame]);

    // setting and unsetting the event listeners from electron.
    useEffect(() => {
        
        // event listeners from electron;

        // add
        ipcRenderer.on("browser-window-created", browserCreatedElectronEventHandler);

        // remove
        ipcRenderer.on("browser-window-closed", browserCloseElectronEventHandler);

        // set active tab
        ipcRenderer.on("browser-window-set-active", setActiveBrowserTabElectronEventHandler);

        // browser-tab-update
        ipcRenderer.on("browser-tab-update", updateBrowserTabElectronEventHandler);


        // cleanup
        return () => {
            ipcRenderer.removeListener("browser-window-created", browserCreatedElectronEventHandler);
            ipcRenderer.removeListener("browser-window-closed", browserCloseElectronEventHandler);
            ipcRenderer.removeListener("browser-window-set-active", setActiveBrowserTabElectronEventHandler);
            ipcRenderer.removeListener("browser-tab-update", updateBrowserTabElectronEventHandler);
        }

    }, []);


    return { addNewBrowserTab, setActiveBrowserTab, removeBrowserTab };

}


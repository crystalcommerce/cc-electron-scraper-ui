import React, { useContext, useEffect, useState, useRef } from "react";
import { ACTIONS } from "../store/GlobalState/reducer";
import { GlobalStateContext } from "../store/GlobalState";
import useDebounce from "./useDebounce";
import { urlConstructor } from "../utilities";

const { ipcRenderer } = window.require("electron");

export default function useAddressBarHook()  {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const formRef = useRef(null);
    
    const inputRef = useRef(null);

    const [url, setUrl] = useState("");

    const [activeTab, setActiveTab] = useState(null);

    const updateBrowserAddressBarComponent = () => {
        dispatch({
            type : ACTIONS.UPDATE_COMPONENTS,
            payload : {
                BrowserAddressBar : {
                    element : inputRef.current,
                }
            }
        })
    }

    const updateUrlInGlobalState = (urlStr = null) =>{

        urlStr = typeof urlStr === "string" ? urlStr : url;

        dispatch({
            type : ACTIONS.SET_MULTI_STATE_PROPERTIES,
            payload : [
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "update-url",
                        tab : {
                            browserWindowId : GlobalState.BrowserTabs.find(item => item.isActive).browserWindowId,
                            url : urlStr,
                            // label : urlStr.trim() !== "" ? urlStr.trim() : "New Tab" ,
                        },
                    }
                },
                {
                    type : ACTIONS.UPDATE_COMPONENTS,
                    payload : {
                        BrowserAddressBar : {
                            disabled : false,
                        },
                    }
                }
            ]
        });

    };

    const updateUrlOnIdle = useDebounce(updateUrlInGlobalState, 777);

    const updateUrlEventHandler = (e, urlStr) => {

        e.preventDefault();

        // this is updating the browser...

        urlStr = typeof urlStr === "string" ? urlStr : url;

        if(urlStr.includes(".com")) {
            urlStr = urlConstructor(urlStr);
        }

        if(urlStr.includes(" ") || !urlStr.includes("."))   {
            let googleUrl = "https://google.com/search?q=";
                googleUrl += urlStr.split(" ").map(item => encodeURIComponent(item.trim())).filter(item => item !== "").join("+");

            urlStr = googleUrl;
        }


        dispatch({
            type : ACTIONS.SET_MULTI_STATE_PROPERTIES,
            payload : [
                {
                    type : ACTIONS.UPDATE_BROWSER_TABS,
                    payload : {
                        operation : "update-url",
                        tab : {
                            browserWindowId : GlobalState.BrowserTabs.find(item => item.isActive).browserWindowId,
                            url : urlStr,
                            label : urlStr.trim() !== "" ? urlStr.trim() : "New Tab" ,
                        },
                        callback : () => {
                            ipcRenderer.send("load-url", {
                                action : "load-url",
                                payload : {...activeTab, url : urlStr.trim() !== "" ? urlStr.trim() : "New Tab"},
                            });
                        }
                    }
                },
                {
                    type : ACTIONS.UPDATE_COMPONENTS,
                    payload : {
                        BrowserAddressBar : {
                            disabled : true,
                        },
                    }
                }
            ]
        });

    }

    const inputKeyDownEventHandler = (e) => {
        // e.preventDefault();

        if (e.ctrlKey && e.code === 'Enter') {
            updateUrlEventHandler(e, urlConstructor(url));
        }
    }

    const onChangeHandler = (e) => {

        e.preventDefault();

        setUrl(prev => {
            if(typeof e.target.value === "string")  {
                return e.target.value;
            } 
        });

        updateUrlOnIdle(e.target.value);
        
    }

    const updateUrlInGlobalStateIPC = (e, data) => {

        if(data.payload.browserWindowId === activeTab.browserWindowId)  {

            dispatch({
                type : ACTIONS.SET_MULTI_STATE_PROPERTIES,
                payload : [
                    {
                        type : ACTIONS.UPDATE_BROWSER_TABS,
                        payload : {
                            operation : "update-url",
                            tab : data.payload,
                        }
                    },
                    {
                        type : ACTIONS.UPDATE_COMPONENTS,
                        payload : {
                            BrowserAddressBar : {
                                disabled : false,
                            },
                        }
                    }
                ]
            });

        }

    }

    const updateBrowserTabElectronEventHandler = (e, data) => {
        if(data.payload.url) {
            setUrl(prev => data.payload.url);
        }
    }

    /* set the active tab first */
    useEffect(() => {
        if(GlobalState.BrowserTabs.find(item => item.isActive)) {
            if(!activeTab || activeTab.browserWindowId !== GlobalState.BrowserTabs.find(item => item.isActive).browserWindowId)  {
                setActiveTab(GlobalState.BrowserTabs.find(item => item.isActive));
            }
        }

        if(GlobalState.Components.BrowserAddressBar.isBlank)    {
            setUrl(prev => "");
        }
    }, [GlobalState]);

    /* set the url based on the active tab... */
    useEffect(() => {
        if(activeTab)   {
            setUrl(prev => activeTab.url);
            dispatch({
                type : ACTIONS.UPDATE_COMPONENTS,
                payload : {
                    BrowserAddressBar : {
                        isBlank : false,
                    }
                }
            });
        }
    }, [activeTab]);

    
    useEffect(() => {

        formRef.current.addEventListener("submit", updateUrlEventHandler);

        inputRef.current.addEventListener("keydown", inputKeyDownEventHandler);

        ipcRenderer.on("url-loaded", updateUrlInGlobalStateIPC);

        ipcRenderer.on("browser-tab-update", updateBrowserTabElectronEventHandler);

        updateBrowserAddressBarComponent();

        /* clean up... */
        return () => {

            

            if(formRef.current) {
                formRef.current.removeEventListener("submit", updateUrlEventHandler);
            }
            if(inputRef.current)    {
                inputRef.current.removeEventListener("keydown", inputKeyDownEventHandler);
            }
        

            ipcRenderer.removeListener("url-loaded", updateUrlInGlobalStateIPC);
            ipcRenderer.removeListener("browser-tab-update", updateBrowserTabElectronEventHandler);

        }

    }, [url]);

    useEffect(() => {
        setUrl("");
    }, []);

    return {formRef, inputRef, url, onChangeHandler};

}
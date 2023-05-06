import React, { useContext, useEffect, useState, useRef } from "react";
import { ACTIONS } from "../store/GlobalState/reducer";
import { GlobalStateContext } from "../store/GlobalState";
import useDebounce from "./useDebounce";
import { urlConstructor } from "../utilities";

const { ipcRenderer } = window.require("electron");

export default function useAddressBarHook(browserWindowId)  {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const formRef = useRef(null);
    
    const inputRef = useRef(null);

    const [url, setUrl] = useState("");

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
                            browserWindowId,
                            url : urlStr,
                            // label : urlStr.trim() !== "" ? urlStr.trim() : "New Tab" ,
                        },
                    }
                },
            ]
        });

    };

    const updateUrlOnIdle = useDebounce(updateUrlInGlobalState, 100);

    const updateUrlEventHandler = (e, urlStr) => {

        e.preventDefault();

        urlStr = urlStr && typeof urlStr === "string" ? urlStr : url;

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
                            browserWindowId,
                            url : urlStr,
                        },
                        callback : (browserTab) => {
                            ipcRenderer.send("load-url", {
                                action : "load-url",
                                payload : {...browserTab, url : urlStr.trim() !== "" ? urlStr.trim() : "New Tab"},
                            });
                        }
                    }
                },
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
            return e.target.value; 
        });

        updateUrlOnIdle(e.target.value);
        
    }

    const updateUrlInGlobalStateIPC = (e, data) => {

        if(data.payload.browserWindowId === browserWindowId)  {

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
        if(data.payload.url && data.payload.browserWindowId === browserWindowId) {
            setUrl(prev => data.payload.url);
        }
    }

    useEffect(() => {
        setUrl(GlobalState.BrowserTabs.find(item => item.browserWindowId === browserWindowId).url);
    }, [GlobalState]);

    useEffect(() => {

        inputRef.current.focus();

        formRef.current.addEventListener("submit", updateUrlEventHandler);

        inputRef.current.addEventListener("keydown", inputKeyDownEventHandler);

        ipcRenderer.on("url-loaded", updateUrlInGlobalStateIPC);

        ipcRenderer.on("browser-tab-update", updateBrowserTabElectronEventHandler);
        
        
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

    return {formRef, inputRef, url, onChangeHandler};

}
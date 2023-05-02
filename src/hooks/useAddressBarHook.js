import React, { useContext, useEffect, useState, useRef } from "react";
import { ACTIONS } from "../store/GlobalState/reducer";
import { GlobalStateContext } from "../store/GlobalState";
import useDebounce from "./useDebounce";

const { ipcRenderer } = window.require("electron");

export default function useAddressBarHook()  {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const formRef = useRef(null);
    
    const inputRef = useRef(null);

    const [url, setUrl] = useState("");

    const [activeTab, setActiveTab] = useState(null);

    const updateUrlInGlobalState = (urlStr = null) =>{

        urlStr = typeof urlStr === "string" ? urlStr : url;
        
        dispatch({
            type : ACTIONS.UPDATE_BROWSER_TABS,
            payload : {
                operation : "update-url",
                tab : {
                    browserWindowId : GlobalState.BrowserTabs.find(item => item.isActive).browserWindowId,
                    url : urlStr,
                    label : urlStr.trim() !== "" ? urlStr.trim() : "New Tab" ,
                },
            }
        });

    };

    const updateUrlOnIdle = useDebounce(updateUrlInGlobalState, 777);

    const updateUrlEventHandler = (e) => {

        e.preventDefault();

        // this is updating the browser...

        ipcRenderer.send("update-browser-windows", {
            action : "load-url",
            payload : activeTab,
        });

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
                type : ACTIONS.UPDATE_BROWSER_TABS,
                payload : {
                    operation : "update-url",
                    tab : data.payload,
                }
            });

        }

    }

    /* set the active tab first */
    useEffect(() => {
        if(GlobalState.BrowserTabs.find(item => item.isActive)) {
            if(!activeTab || activeTab.browserWindowId !== GlobalState.BrowserTabs.find(item => item.isActive).browserWindowId)  {
                setActiveTab(GlobalState.BrowserTabs.find(item => item.isActive));
            }
        }
    }, [GlobalState]);

    /* set the url based on the active tab... */
    useEffect(() => {
        if(activeTab)   {
            setUrl(prev => activeTab.url);
        }
    }, [activeTab]);

    /* 
        set the event listener for form submit 
        and put the focus on the address bar when url is updated 
        we also add event listener for ipcRenderer here.
    */
    useEffect(() => {

        formRef.current.addEventListener("submit", updateUrlEventHandler);

        inputRef.current.focus();

        ipcRenderer.on("update-browser-window", updateUrlInGlobalStateIPC);

        /* clean up... */
        return () => {

            if(formRef.current) {
                formRef.current.removeEventListener("submit", updateUrlEventHandler);
            }

            ipcRenderer.removeListener("update-browser-window", updateUrlInGlobalStateIPC);
        }

    }, [url]);

    return {formRef, inputRef, url, onChangeHandler};

}
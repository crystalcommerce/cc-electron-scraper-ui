import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";

const { ipcRenderer } = window.require("electron");

export default function useNavButtonHook({page, onClick, hasFrameWindow})   {

    const [disabled, setDisabled] = useState(false);
    const [variant, setVariant] = useState("default");
    const [GlobalState, dispatch] = useContext(GlobalStateContext);


    const [activePageHasFrameWindow, setActivePageHasFrameWindow] = useState(false); 

    const [isLoading, setIsLoading] = useState(false);

    
    const dispatchFunction = (e, data) => {

        setIsLoading(false);

        if(data.nextPage)   {

            dispatch({
                type : ACTIONS.SET_MULTI_STATE_PROPERTIES,
                payload : [
                    
                    {
                        type : ACTIONS.SET_ACTIVE_PAGE, 
                        payload : {
                            page : data.nextPage,
                            isActive : true,   
                        }
                    },

                    {
                        type : ACTIONS.SET_APP_WINDOW_DETAILS,
                        payload : {
                            AppWindow : {
                                isFrameDelayedLoading : false,
                            }
                        }
                    },
    
                ]
            });
        }

    }
    
    const clickHandler = (e) => {
        if(onClick) {
            onClick(e);
        }
        setDisabled(true);
        setVariant("contained");

        if(activePageHasFrameWindow || hasFrameWindow)  {
            setIsLoading(true);
            ipcRenderer.send("hide-frame-windows", {
                message : "hiding frame windows",
                windowId : GlobalState.AppWindowId,
                nextPage : page,
            });

        } else  {

            dispatch({
                type : ACTIONS.SET_MULTI_STATE_PROPERTIES,
                payload : [

                    {
                        type : ACTIONS.SET_APP_WINDOW_DETAILS,
                        payload : {
                            AppWindow : {
                                isFrameDelayedLoading : false,
                            }
                        }
                    },

                    {
                        type : ACTIONS.SET_ACTIVE_PAGE, 
                        payload : {
                            page,
                            isActive : true,   
                        }
                    }

                ]
            });
            
        }
    }

    useEffect(() => {
        /* retrieving signal from server that all frame windows are now hidden... */
        ipcRenderer.on("active-frames-hidden", dispatchFunction);
    
        return () => {
            ipcRenderer.removeListener("active-frames-hidden", dispatchFunction);
        };
        
    }, []);

    useEffect(() => {

        /* setting the buttons */
        let foundPage = GlobalState.Pages.find(item => item.page === page);

        if(foundPage.isActive)  {
            setDisabled(true);
            setVariant("contained");
        } else  {
            setDisabled(false);
            setVariant("default");
        }


        /* getting the current active page before click event; */
        let currentActivePage = GlobalState.Pages.find(item => item.isActive),
            currentActiveNav = GlobalState.NavItems.find(item => item.page === currentActivePage.page)

        setActivePageHasFrameWindow(currentActiveNav.hasFrameWindow);  
        
    }, [GlobalState]);   

    return {variant, disabled, clickHandler, isLoading};

}
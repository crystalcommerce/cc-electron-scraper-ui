import React, { useContext } from "react";
import { AppWindowsContext } from "../store/AppWindows";
import { ACTIONS } from "../store/AppWindows/reducer";

export default function useSidebarClickHandler()    {

    const [AppWindowsState, dispatch] = useContext(AppWindowsContext);

    const showSidebarClickHandler = (e) => {

        if(AppWindowsState.sidebarHidden)   {
            dispatch({type : ACTIONS.SET_SIDEBAR_HIDDEN, payload : false});
            dispatch({type : ACTIONS.SET_MAIN_COMPONENT_CLASS_NAME, payload : "with-side-bar"});
        } else  {
            dispatch({type : ACTIONS.SET_SIDEBAR_HIDDEN, payload : true});
            dispatch({type : ACTIONS.SET_MAIN_COMPONENT_CLASS_NAME, payload : ""});
        }

    }

    return {showSidebarClickHandler};

}
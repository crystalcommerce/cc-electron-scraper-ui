import React, { useContext } from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";

export default function useSidebarClickHandler()    {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const showSidebarClickHandler = (e) => {

        if(GlobalState.Components.Sidebar.hidden)   {

            dispatch({
                type : ACTIONS.UPDATE_COMPONENTS/* SET_SIDEBAR_HIDDEN */, 
                payload : {
                    Sidebar : {
                        hidden : false,
                    },
                    Main : {
                        toggleClassName : "with-side-bar",
                    }
                }
            });
        } else  {

            dispatch({
                type : ACTIONS.UPDATE_COMPONENTS/* SET_SIDEBAR_HIDDEN */, 
                payload : {
                    Sidebar : {
                        hidden : true,
                    },
                    Main : {
                        toggleClassName : "",
                    }
                }
            });
        }
    }

    return {showSidebarClickHandler};

}
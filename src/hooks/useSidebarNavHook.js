import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";

export default function useSidebarNavHook() {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const [activePage, setActivePage] = useState(null);

    const [activeSubPage, setActiveSubPage] = useState(null);

    const [currentNavList, setCurrentNavList] = useState([]);

    const [disabled, setDisabled] = useState(false);

    const clickHandler = (item, e) => {
        e.preventDefault();

        let {parentPage, page} = item;
        

        dispatch({
            type : ACTIONS.SET_ACTIVE_SUBPAGE,
            payload : {
                page,
                parentPage : parentPage,
                isActive : true,
            }
        });


    }   

    useEffect(() => {

        setActivePage(prev => GlobalState.Pages.find(item => item.isActive));    

        if(activePage)  {

            setActiveSubPage(prev => GlobalState.SubPages.find(item => item.isActive && activePage.page === item.parentPage));
            
        }

    }, [GlobalState]);

    useEffect(() => {

        if(activePage)  {
            
            setCurrentNavList(prev => GlobalState.SidebarNavItems.filter(item => activePage.page === item.parentPage));            

        }

    }, [activePage]);

    useEffect(() => {

        if(!currentNavList.length)  {
            dispatch({
                type : ACTIONS.UPDATE_COMPONENTS,
                payload : {
                    Sidebar : {
                        hidden : true,
                    }
                }
            });

            setDisabled(true);
        } else  {
            dispatch({
                type : ACTIONS.UPDATE_COMPONENTS,
                payload : {
                    Sidebar : {
                        hidden : false,
                    }
                }
            });
            setDisabled(false);
        }
        

    }, [currentNavList]);


    return {activePage, currentNavList, disabled, clickHandler, activeSubPage}


}
import React, {useEffect, useContext} from "react";
import { GlobalStateContext } from "../store/GlobalState";


export default function useActiveSubPagesHook(pageName)    {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);
    
    const activeParentPage = GlobalState.Pages.find(item => item.isActive);

    const {isActive} = GlobalState.SubPages.find(item => item.page == pageName && activeParentPage.page === item.parentPage);

    return isActive;

}
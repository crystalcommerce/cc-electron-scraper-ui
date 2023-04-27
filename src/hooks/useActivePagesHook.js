import React, {useEffect, useContext} from "react";
import { GlobalStateContext } from "../store/GlobalState";


export default function useActivePages(pageName)    {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);
    
    const {isActive} = GlobalState.Pages.find(item => item.page == pageName);

    return isActive;

}
    
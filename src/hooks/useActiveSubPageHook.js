import React, {useEffect, useContext} from "react";
import { GlobalStateContext } from "../store/GlobalState";


export default function useActivePagesHook(pageName)    {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);
    
    const {isActive} = GlobalState.SubPages.find(item => item.page == pageName);

    return isActive;

}
import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";

export default function useNavButtonHook({page, onClick})   {

    const [disabled, setDisabled] = useState(false);
    const [variant, setVariant] = useState("default");
    const [GlobalState, dispatch] = useContext(GlobalStateContext);
    
    
    const clickHandler = (e) => {
        if(onClick) {
            onClick(e);
        }
        dispatch({
            type : ACTIONS.SET_ACTIVE_PAGE, 
            payload : {
                page,
                isActive : true,   
            }
        });

        setDisabled(true);
        setVariant("contained");
    }

    useEffect(() => {

        let foundPage = GlobalState.Pages.find(item => item.page === page);

        if(!foundPage.isActive)  {
            setDisabled(false);
            setVariant("default");
        } else  {
            setDisabled(true);
            setVariant("contained");
        }
    }, [GlobalState]);


    return {variant, disabled, clickHandler};

}
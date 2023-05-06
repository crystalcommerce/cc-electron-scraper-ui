import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../store/GlobalState";

export default function useSidebarNavItemHook(page, onClick, hasFrameWindow) {
    

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const [disabled, setDisabled] = useState(false);
    const [variant, setVariant] = useState("default");
    const [isLoading, setIsLoading] = useState(false);

    const clickHandler = () => {

    }

    useEffect(() => {

    }, []);
    

    return {variant, disabled, clickHandler, isLoading};

}
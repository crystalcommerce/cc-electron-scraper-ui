import React, { useContext } from "react";
import { GlobalStateContext } from "../../store/GlobalState";
import useElementDimensions from "../../hooks/useElementDimensions";
import useMainHook from "../../hooks/useMainHook";


export default function Main({children, className})  {

    const [GlobalState] = useContext(GlobalStateContext);

    const {animationCallback} = useMainHook();
    const {animationHandler} = useElementDimensions();
    const {startHandler, endHandler} = animationHandler(animationCallback);

    // we need a callback;
    // const {startHandler, endHandler} = animationHandler();

    return (
        <main onAnimationStart={startHandler} onAnimationEnd={endHandler} className={`cc-main-container ${GlobalState.Components.Main.toggleClassName} ${className || ""}`}>{children}</main>
    )
}
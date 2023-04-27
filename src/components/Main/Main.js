import React, { useContext } from "react";
import { GlobalStateContext } from "../../store/GlobalState";
import useBrowserFrameHook from "../../hooks/useBrowserFrameHook";


export default function Main({children, className})  {

    const {animationStartHandler, animationEndHandler } = useBrowserFrameHook();
    const [GlobalState] = useContext(GlobalStateContext);

    return (
        <main onAnimationStart={animationStartHandler} onAnimationEnd={animationEndHandler} className={`cc-main-container ${GlobalState.Components.Main.toggleClassName} ${className || ""}`}>{children}</main>
    )
}
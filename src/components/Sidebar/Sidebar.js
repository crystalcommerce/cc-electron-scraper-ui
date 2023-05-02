import React, { useContext } from "react";
import { GlobalStateContext } from "../../store/GlobalState";
import useElementDimensions from "../../hooks/useElementDimensions";
import useSidebarHook from "../../hooks/useSidebarHook";


export default function Sidebar({children, className}) {

    const [GlobalState] = useContext(GlobalStateContext);

    const {animationCallback} = useSidebarHook();
    const {animationHandler} = useElementDimensions();
    const {startHandler, endHandler} = animationHandler(animationCallback, animationCallback);

    return (
        <aside onAnimationStart={startHandler} onAnimationEnd={endHandler} className={`cc-main-sidebar ${GlobalState.Components.Sidebar.hidden ? "" : "show"} ${className ? className  : ""}`}>{children}</aside>
    )

}
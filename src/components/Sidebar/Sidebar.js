import React, { useContext } from "react";
import { GlobalStateContext } from "../../store/GlobalState";

export default function Sidebar({children, className}) {

    const [GlobalState] = useContext(GlobalStateContext);

    return (
        <aside className={`cc-main-sidebar ${GlobalState.Components.Sidebar.hidden ? "" : "show"} ${className ? className  : ""}`}>{children}</aside>
    )

}
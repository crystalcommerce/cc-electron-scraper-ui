import React, { useContext } from "react";
import { GlobalStateContext } from "../../store/GlobalState";


export default function Main({children, className})  {

    const [GlobalState] = useContext(GlobalStateContext);

    return (
        <main className={`cc-main-container ${GlobalState.Components.Main.toggleClassName} ${className || ""}`}>{children}</main>
    )
}
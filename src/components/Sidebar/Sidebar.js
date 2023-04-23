import React, { useState, useEffect, useContext } from "react";
import { AppWindowsContext } from "../../store/AppWindows";

export default function Sidebar({children, className}) {

    const [AppWindowsState] = useContext(AppWindowsContext);

    return (
        <aside className={`cc-main-sidebar ${AppWindowsState.sidebarHidden ? "" : "show"} ${className || ""}`}>{children}</aside>
    )

}
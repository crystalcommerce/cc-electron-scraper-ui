import React, { useState } from "react";

export default function useToggleCardHook() {

    const [activeCardClassName, setActiveCardClassName] = useState("");

    const [toggleCardParentClassName] = useState("toggle-data-card-container")

    const toggleClickHandler =() => {
        setActiveCardClassName(prev => prev !== "" ? "" : "shown");
    }

    return {toggleClickHandler, activeCardClassName, toggleCardParentClassName};


}
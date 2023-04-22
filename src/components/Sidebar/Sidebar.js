import React, { useState, useEffect } from "react";

export default function Sidebar({children, className, sidebarShown}) {

    const [addedClass, setAddedClass] = useState("cc-main-sidebar");

    useEffect(() => {

        setAddedClass(prev => {
            if(sidebarShown)    {
                return `${prev} show`;
            } else  {
                return "cc-main-sidebar";
            }
        })

    }, [sidebarShown])

    return (
        <aside className={`${addedClass} ${className || ""}`}>{children}</aside>
    )

}
import React from "react";
import useActivePagesHook from "../../hooks/useActivePagesHook";


export default function Home({children})    {

    const isActive = useActivePagesHook("Home");

    return (
        <>
            {isActive && 
                <div className="cc-page-div">{children}</div>
            }
        </>
        
    )
}
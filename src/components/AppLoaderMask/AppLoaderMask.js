import React from "react";

export default function AppLoaderMask({open})   {

    return (
        <>
            {open && 
                <div open={open} className={`cc-app-loading-container`}>
                    
                </div>
            }
        </>
    );
    
}
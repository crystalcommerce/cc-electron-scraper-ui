import React from "react";
import useClassObjectByWidth from "../../hooks/useClassObjectByWidth";

import EmptyCard from "../EmptyCard";

export default function Card({className, children, classObject, noFlex, elRef})  {

    elRef = elRef ? elRef : null;

    let addedClasses = useClassObjectByWidth(classObject);
    
    return (
        <>
            {!noFlex && 
                <EmptyCard className={`empty-card-container ${className ? className : ""} ${addedClasses}`}>
                    <div ref={elRef} className="cc-card">{children}</div>
                </EmptyCard>
            }
            {noFlex && 
                <div ref={elRef} className={`cc-card ${className ? className : ""}`}>{children}</div>
            }
        </>
        
    )

}
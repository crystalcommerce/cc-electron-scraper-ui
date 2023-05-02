import React, { useRef } from "react";
import Card from "../Card";
import useFrameWindowHook from "../../hooks/useFrameWindowHook";
import EmptyCard from "../EmptyCard/EmptyCard";


export default function FrameWindow({ children, componentId, innerClassName, className })    {

    const cardRef = useRef();

    className = className || "";
    innerClassName = innerClassName || "";

    useFrameWindowHook(componentId, cardRef);

    return (
        <div className={`cc-browser-frame-div ${className}`}>
            <EmptyCard className="cc-browser-frame-empty-card-container empty-card cc-flex cc-col">
                {children}
                <Card noFlex className={`cc-browser-container ${innerClassName}`} elRef={cardRef}></Card>
            </EmptyCard>
        </div>
    );

}

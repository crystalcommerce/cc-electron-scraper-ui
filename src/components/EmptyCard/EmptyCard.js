import React from "react";

export default function EmptyCard({className, children, style})    {
    return (
        <div className={`${className} empty-card`} style={style}>{children}</div>
    )
}
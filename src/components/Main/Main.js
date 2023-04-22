import React from "react";

export default function Main({children, className, mainBodyAnimationEndHandler})  {
    return (
        <main onAnimationEndCapture={mainBodyAnimationEndHandler} className={`cc-main-container ${className}`}>{children}</main>
    )
}
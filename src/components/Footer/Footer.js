import React from "react";

export default function({children, className}) {
    
    return (
        <footer className={`cc-main-footer ${className}`}>
            {children}
        </footer>
    )

}
import React, { useEffect } from "react";
import useToggleCardHook from "../../hooks/useToggleCardHook";
import Card from "../Card/Card";

export default function ToggleCardData({children, className})  {



    return (
        <Card className={`toggle-card-data ${className}`}>
            {children}
        </Card>
    )
}
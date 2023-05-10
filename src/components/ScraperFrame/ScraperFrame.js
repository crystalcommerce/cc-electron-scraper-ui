import React, { useRef } from "react";

import Card from "../Card/Card";
import useScraperFrameHook from "../../hooks/useScraperFrameHook";


export default function ScraperFrame()  {

    const cardRef = useRef(null);

    useScraperFrameHook(cardRef);

    return (
        <>
            <Card elRef={cardRef} 
                
                className="scraper-frame"
                classObject={{
                    // xs : "col-4",
                    // sm : "col-4",
                    // md : "col-4",
                    // lg : "col-3",
                    // xlg : "col-2",
                }}
            ></Card>
        </>
    )

}
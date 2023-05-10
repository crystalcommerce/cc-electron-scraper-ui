import React, { useRef } from "react";

import Card from "../Card/Card";
import useScraperFrameHook from "../../hooks/useScraperFrameHook";
import { List, ListItem, Typography } from "@mui/material";


export default function ScriptCardContainer({siteName, siteUrl, fileNameWithExt})  {

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
            >
                <List>
                    <ListItem>
                    <Typography variant="p">Site Name</Typography> : <Typography variant="p">{siteName}</Typography>
                    </ListItem>
                    <ListItem>
                    <Typography variant="p">Site URL</Typography> : <Typography variant="p">{siteUrl}</Typography>
                    </ListItem>
                    <ListItem>
                    <Typography variant="p">JS FileName</Typography> : <Typography variant="p">{fileNameWithExt}</Typography>
                    </ListItem>
                </List>

            </Card>
        </>
    )

}
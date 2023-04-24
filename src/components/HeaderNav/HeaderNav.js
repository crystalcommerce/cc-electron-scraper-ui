import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import useNewAppWindowHandler from "../../hooks/useNewAppWindowHandler";
import { AppWindowsContext } from "../../store/AppWindows";


export default function HeaderNav() {

    const [AppWindowsState] = useContext(AppWindowsContext);

    const newAppInstanceClickHandler = useNewAppWindowHandler()

    return (
        <nav className="cc-header-nav">
            <ul>
                <li>
                    <a href="#" className="selected">
                        Hello there
                    </a>
                </li>
                <li>
                    <a href="#" className="active">
                        Hello there
                    </a>
                </li>
                <li>
                    <a href="#" className="disabled">
                        Hello there
                    </a>
                </li>
                <li>
                    <Button variant="contained" onClick={newAppInstanceClickHandler}>
                        + New App Instance
                    </Button>
                </li>

                <li>
                <div>
                    <Typography>{AppWindowsState.appWindowId}</Typography>
                </div>
                </li>
            </ul>
            
        </nav>
    )
}
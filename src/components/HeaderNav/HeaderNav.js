import React from "react";
import { Button } from "@mui/material";
import useNewAppWindowHandler from "../../hooks/useNewAppWindowHandler";


export default function HeaderNav() {

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
            </ul>
        </nav>
    )
}
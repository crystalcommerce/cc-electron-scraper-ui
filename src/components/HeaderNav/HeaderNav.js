import { Button } from "@mui/material";
import React from "react";

const { ipcRenderer } = window.require("electron");

export default function HeaderNav() {

    const newAppInstanceClickHandler = (e) => {
        ipcRenderer.send("new-app-instance", {message : "Please spawn a new app."});
    }

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
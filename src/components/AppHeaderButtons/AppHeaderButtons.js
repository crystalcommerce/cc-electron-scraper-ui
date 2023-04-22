import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import DoubleSquare from '@mui/icons-material/FilterNone';
import SingleSquare from '@mui/icons-material/CropSquare';

const {ipcRenderer} = window.require("electron");


export default function AppHeaderButtons()  {

    const [variant, setVariant] = useState("default");
    
    const closeButtonMouseOverHandler = (e) => {
        setVariant(state => "contained");
    };

    const closeButtonMouseOutHandler = () => {
        setVariant(state => "default");
    };

    const closeAppHandler = (e) => {
        e.preventDefault();

        ipcRenderer.send("close-application", {
            message : "Closing the application"
        })
    };

    const minimizeAppHandler = (e) => {
        ipcRenderer.send("minimize-application", {
            message : "Minimizing the application"
        })
    };
    

    const [fullScreen, setFullScreen] = useState(false);

    const fullScreenClickHandler = (e) => {
        
        setFullScreen(prev => {
            ipcRenderer.send("full-screen-application", {
                message : "fullScreen App the application",
                state : !prev
            });

            return !prev;
        });
    }


    return (
        <div className="cc-app-window-buttons-container">
            <Button size="small" variant="default" className={`app-header-button`} onClick={minimizeAppHandler}>
                <MinimizeIcon className="icon"  />
            </Button>
            <Button size="small" variant="default" className={`app-header-button`} onClick={fullScreenClickHandler}>
                {!fullScreen &&
                    <SingleSquare className="icon"  />
                }
                {fullScreen &&
                    <DoubleSquare className="icon" />
                }
            </Button>
            <Button size="small" variant={variant} color="error" className={`app-header-button`}  onMouseOver={closeButtonMouseOverHandler} onMouseOut={closeButtonMouseOutHandler} onClick={closeAppHandler}>
                <CloseIcon className="icon"  />
            </Button>
        </div>
    );
}
import React from "react";
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import DoubleSquare from '@mui/icons-material/FilterNone';
import SingleSquare from '@mui/icons-material/CropSquare';
import useAppButtonHandlers from "../../hooks/useAppButtonHandlers";


const {ipcRenderer} = window.require("electron");

export default function AppHeaderButtons()  {

    const {fullScreenClickHandler, closeButtonMouseOutHandler, closeButtonMouseOverHandler, closeAppHandler, minimizeAppHandler, fullScreen, variant} = useAppButtonHandlers()

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
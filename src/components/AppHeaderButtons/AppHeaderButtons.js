import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import DoubleSquare from '@mui/icons-material/FilterNone';
import SingleSquare from '@mui/icons-material/CropSquare';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useAppHeaderButtonsHook from "../../hooks/useAppHeaderButtonsHook";
import useNewAppWindowHandler from "../../hooks/useNewAppWindowHandler";
import { GlobalStateContext } from "../../store/GlobalState";


export default function AppHeaderButtons()  {

    const [GlobalState] = useContext(GlobalStateContext);
    const {fullScreenClickHandler, closeButtonMouseOutHandler, closeButtonMouseOverHandler, closeAppHandler, minimizeAppHandler, fullScreen, variant} = useAppHeaderButtonsHook();
    const newAppInstanceClickHandler = useNewAppWindowHandler();

    return (
        <div className="cc-app-window-buttons-container cc-row">
            <div className="cc-flex center col-4">
                <Typography fontSize="small">App Window ID : {GlobalState.AppWindowId}</Typography>
                
            </div>

            <div className="cc-flex col-5">
                <Button size="small" variant="default" className={`app-header-button`} onClick={newAppInstanceClickHandler}>
                    <OpenInNewIcon className="icon"  />
                </Button>
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

        </div>
    );
}
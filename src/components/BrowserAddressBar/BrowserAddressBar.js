import React, { useContext, useRef, useState } from "react";
import Card from "../Card/Card";
import useAddressBarHook from "../../hooks/useAddressBarHook";
import { GlobalStateContext } from "../../store/GlobalState";
import { IconButton } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import useOpenDevToolsHook from "../../hooks/useOpenDevToolsHook";

export default function BrowserAddressBar()   {

    const {formRef, inputRef, url, onChangeHandler} = useAddressBarHook();

    const {openDevToolsClickHandler} = useOpenDevToolsHook()

    const [GlobalState] = useContext(GlobalStateContext);

    return (
        <Card className={"browser-address-bar no-padding no-shadow"} noFlex >
            <form ref={formRef} className={`cc-flex cc-col gapped`}>
                {   
                    GlobalState.Components.BrowserAddressBar.disabled && 
                    <input disabled ref={inputRef} value={url} onChange={onChangeHandler} type="text"  className="address-bar-input" />
                }
                {   
                    !GlobalState.Components.BrowserAddressBar.disabled && 
                    <input ref={inputRef} value={url} onChange={onChangeHandler} type="text"  className="address-bar-input" />
                }
                <IconButton className="dev-tools-button" size="small" onClick={openDevToolsClickHandler}><SettingsIcon></SettingsIcon></IconButton>
            </form>
        </Card>
    );

}
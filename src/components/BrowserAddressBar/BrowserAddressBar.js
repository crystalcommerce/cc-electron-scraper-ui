import React, { useContext, useRef, useState } from "react";
import useAddressBarHook from "../../hooks/useAddressBarHook";

import { IconButton } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import useOpenDevToolsHook from "../../hooks/useOpenDevToolsHook";

export default function BrowserAddressBar({browserWindowId})   {

    const {formRef, inputRef, url, onChangeHandler} = useAddressBarHook(browserWindowId);

    const {openDevToolsClickHandler} = useOpenDevToolsHook(browserWindowId);

    return (
        <form ref={formRef} className={`cc-flex cc-col gapped`}>
            <input ref={inputRef} value={url} onChange={onChangeHandler} type="text"  className="address-bar-input" />
            <IconButton className="dev-tools-button" size="small" onClick={openDevToolsClickHandler}><SettingsIcon></SettingsIcon></IconButton>
        </form>
    );

}
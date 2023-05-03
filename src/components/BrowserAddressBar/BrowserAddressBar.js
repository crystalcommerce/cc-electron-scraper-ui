import React, { useContext, useRef, useState } from "react";
import Card from "../Card/Card";
import useAddressBarHook from "../../hooks/useAddressBarHook";
import { GlobalStateContext } from "../../store/GlobalState";

export default function BrowserAddressBar()   {

    const {formRef, inputRef, url, onChangeHandler} = useAddressBarHook();

    const [GlobalState] = useContext(GlobalStateContext)

    return (
        <Card className={"browser-address-bar no-padding no-shadow"} noFlex >
            <form ref={formRef}>
                <input disabled={GlobalState.Components.BrowserAddressBar.disabled} ref={inputRef} value={url} onChange={onChangeHandler} type="text"  className="address-bar-input" />
            </form>
        </Card>
    );

}
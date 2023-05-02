import React, { useRef, useState } from "react";
import Card from "../Card/Card";
import useAddressBarHook from "../../hooks/useAddressBarHook";

export default function BrowserAddressBar()   {

    const {formRef, inputRef, url, onChangeHandler} = useAddressBarHook();

    return (
        <Card className={"browser-address-bar no-padding no-shadow"} noFlex >
            <form ref={formRef}>
                <input ref={inputRef} value={url} onChange={onChangeHandler} type="text"  className="address-bar-input" />
            </form>
        </Card>
    );

}
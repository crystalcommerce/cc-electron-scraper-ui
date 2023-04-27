import React, { useState } from "react";
import { Button } from "@mui/material";
import useNavButtonHook from "../../hooks/useNavButtonHook";


export default function NavButton({children, page, startIcon, onClick}) {

    let {variant, disabled, clickHandler} = useNavButtonHook({page, onClick});

    return (
        <>  
            {
                !disabled &&
                <Button variant={variant} onClick={clickHandler}>{children}</Button>
            }
            {
                disabled && 
                <Button variant={variant} onClick={clickHandler} disabled>{children}</Button>
            }
            
        </>
    );

}
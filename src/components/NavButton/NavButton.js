import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import useNavButtonHook from "../../hooks/useNavButtonHook";
import CircularProgress from '@mui/material/CircularProgress';
import { GlobalStateContext } from "../../store/GlobalState";

export default function NavButton({children, page, startIcon, onClick, hasFrameWindow}) {

    // <CircularProgress color="inherit" />

    let {variant, disabled, clickHandler, isLoading} = useNavButtonHook({page, onClick, hasFrameWindow});

    const [GlobalState] = useContext(GlobalStateContext);

    return (
        <>  
            {
                !disabled && 
                <Button style={{textTransform: "none"}} variant={variant} onClick={clickHandler}>{children}</Button>
            }
            {
                disabled && isLoading &&
                <Button style={{textTransform: "none"}} variant={variant} onClick={clickHandler} startIcon={<CircularProgress size="16px" color="inherit" />} disabled> {children}</Button>
            }
            {
                disabled && GlobalState.Pages.find(item => item.page === page).isActive &&
                <Button style={{textTransform: "none"}} variant={variant} onClick={clickHandler} disabled>{children}</Button>
            }
            
        </>
    );

}
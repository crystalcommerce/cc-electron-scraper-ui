import React from "react";
import Card from "../Card/Card";
import { Button, IconButton } from "@mui/material";
import NativeImage from "../NativeImage/NativeImage";
import PublicIcon from '@mui/icons-material/Public';
import { Add, Close } from "@mui/icons-material";


export default function BrowserTab({children, onClick, disabled, addButton, className, icon, label, onClose, closeButtonDisabled})    {
    

    return (
        <>  
            <Card className={`auto-width browser-tab  ${className || ""} ${addButton ? "add-button" : "normal-tabs"} ${disabled ? "disabled" : ""}`} noFlex>
                { !disabled && !addButton &&
                    <div className="tab-buttons-container">
                        {(label === "New Tab" || !icon) && 
                            <PublicIcon className={"cc-tab-icon"}></PublicIcon>
                        }
                        {
                            icon && 
                            <NativeImage height="18" width="18" className={"cc-tab-icon"} src={icon} />
                        }
                        <Button onClick={onClick} className={`cc-tab-button`} style={{textTransform : "none"}} color={"primary"} variant="default" size={"small"} fullWidth>
                            {label}
                            {children}
                        </Button>
                        <IconButton onClick={onClose} size={"small"} className="cc-close-tab-button">
                            <Close sx={{fontSize : 14}}></Close>
                        </IconButton>
                    </div>

                }
                { disabled && !addButton &&
                    <div className="tab-buttons-container">
                        {(label === "New Tab" || !icon) &&
                            <PublicIcon className={"cc-tab-icon"}></PublicIcon>
                        }
                        {
                            icon && 
                            <NativeImage height="18" width="18" className={"cc-tab-icon"} src={icon} />
                        }
                        <Button onClick={onClick} disabled className={`cc-tab-button`} style={{textTransform : "none"}} color={"primary"} variant="default" size={"small"} fullWidth>
                            
                            {label}
                            {children}
                        </Button>
                        <IconButton disabled={closeButtonDisabled} onClick={onClose} className="cc-close-tab-button">
                            <Close sx={{fontSize : 14}}></Close>
                        </IconButton>
                    </div>
                        
                }

                {
                    addButton && 


                    <Button disabled={disabled} onClick={onClick} className={`cc-tab-button`} style={{textTransform : "none"}} color={"primary"} variant="default" size={"small"} fullWidth>
                        <Add sx={{fontSize : 18}}></Add>
                    </Button>

                }
                
            </Card>
        </>
    )


}
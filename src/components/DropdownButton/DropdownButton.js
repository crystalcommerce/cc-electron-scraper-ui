import React, {useState, useRef} from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';


export default function DropdownButton({dropdownOptions, size, style})    {

    dropdownOptions = dropdownOptions || [];

    style = style || {};

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedActionButton, setSelectedActionButton] = useState(dropdownOptions[0] || {});
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const paddingPerSize = {
        small : "4px 10px",
        medium : "6px 16px",
        large : "8px 22px",
    };
    let foundKey = Object.keys(paddingPerSize).find(key => key === size) || "small",
        paddingValue = paddingPerSize[foundKey];

    const handleMenuItemClick = (event, index) => {
		setSelectedActionButton(state => dropdownOptions[index]);
        setSelectedIndex(index);
		setOpen(false);
	};

    const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

    const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
		return;
		}

		setOpen(false);
	};



    return (
        <>
            <ButtonGroup 
                size={size || "small"} 
                variant={selectedActionButton.variant || "contained"} 
                color={selectedActionButton.color || "primary"}
                ref={anchorRef} 
                aria-label="split button"
            >
                <Button 
                    sx={style}
                    color={selectedActionButton.color || "primary"} 
                    startIcon={selectedActionButton.icon} 
                    size={size || "small"} 
                    onClick={selectedActionButton.optionClickHandler}
                >
                    {selectedActionButton.label}
                </Button>
                <Button
                    color={selectedActionButton.color || "primary"} 
                    size={size || "small"} 
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="dropdown-button"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper sx={{zIndex : 5}}open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement="bottom-start">
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
                >
                <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu" size={size || "small"} style={{zIndex : 5}}>
                                {dropdownOptions.map((option, index) => (
                                    <MenuItem
                                        key={`${option}-${index}`}
                                        selected={index === selectedIndex}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                        sx = {{padding : paddingValue}}
                                    >	
                                        <ListItemIcon>{option.icon}</ListItemIcon>{option.dropdownLabel || option.label}
                                        
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </>

    )
}
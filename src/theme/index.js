import { createTheme, experimental_sx as sx } from '@mui/material/styles';
export {default as GlobalCssOverride} from "./global-styles";

const globalClassPrefix = "CcMui";

export const theme = createTheme({
    palette: {
        mode : "dark",
        primary: {
            main: '#728e9f',
            light : "rgb(142, 164, 178)",
            dark: 'rgb(79, 99, 111)',
        },
        secondary: {
            main: '#2a9292',
            light : "rgb(84, 167, 167)",
            dark: 'rgb(29, 102, 102)',
        },
        error: {
            main: '#a74d4d',
            light : "rgb(184, 112, 112)",
            dark: 'rgb(116, 53, 53)',
        },
        info: {
            main: '#4e9ab3',
            light : "rgb(113, 174, 194)",
            dark: 'rgb(54, 107, 125)',
        },
        success: {
            main: '#5d9b6d',
            light : "rgb(125, 175, 138)",
            dark: 'rgb(65, 108, 76)',
        },
        warning: {
            main: '#ab7b34',
            light : "rgb(187, 149, 92)",
            dark: 'rgb(119, 86, 36)',
        },
        text : {
            primary : "#fff",
            secondary : "rgba(255, 255, 255, 0.7)",
            disabled : "rgba(255, 255, 255, 0.7)",
            icon : "rgba(255, 255, 255, 0.5)",
            
        },
        divider : "rgba(255, 255, 255, 0.12)",
    },
    typography: {
        
        h1: {
            fontSize: '4.9rem',
            color : "#fff",
            wordWrap : "break-word",
            // wordBreak : "break-all",
        },
        h2: {
            fontSize: '4.2rem',
            color : "#fff",
            wordWrap : "break-word",
            // wordBreak : "break-all",
        },
        h3: {
            fontSize: '3.5rem',
            color : "#fff",
            wordWrap : "break-word",
            // wordBreak : "break-all",
        },
        h6: {
            fontSize: '1.4rem',
            color : "#fff",
            wordWrap : "break-word",
            // wordBreak : "break-all",
        },
        h5: {
            fontSize: '2.1rem',
            color : "#fff",
            wordWrap : "break-word",
            // wordBreak : "break-all",
        },
        h4: {
            fontSize: '2.8rem',
            color : "#fff",
            wordWrap : "break-word",
            // wordBreak : "break-all",
        },
        body1 : {
            color : "rgba(255, 255, 255, 0.7)",
            wordWrap : "break-word",
            // wordBreak : "break-all",
        },
        body2 : {
            color : "rgba(255, 255, 255, 0.5)",
            wordWrap : "break-word",
            // wordBreak : "break-all",
        }
    },
    spacing: 8,
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiButtonBase : {
            styleOverrides: {
                root : {
                    "&:hover, &:active, &:visited" : {
                        fontFamily : `"Roboto","Helvetica","Arial",sans-serif`,
                        color : "#fff",
                    },
                    "&.MuiButton-containedPrimary" : {
                        "&:active" : {
                            backgroundColor : "rgb(79, 99, 111)",
                            color : "#fff",
                        },
                        "&:focus" : {
                            backgroundColor : "rgb(79, 99, 111)",
                            color : "#fff",
                        }
                    },
                    "&.MuiButton-containedSecondary" : {
                        "&:active" : {
                            backgroundColor : "rgb(29, 102, 102)",
                            color : "#fff",
                        },
                        "&:focus" : {
                            backgroundColor : "rgb(29, 102, 102)",
                            color : "#fff",
                        }
                    },
                    "&.MuiButton-containedSuccess" : {
                        "&:active" : {
                            backgroundColor : "rgb(65, 108, 76)",
                            color : "#fff",
                        },
                        "&:focus" : {
                            backgroundColor : "rgb(65, 108, 76)",
                            color : "#fff",
                        }
                    },
                    "&.MuiButton-containedInfo" : {
                        "&:active" : {
                            backgroundColor : "rgb(54, 107, 125)",
                            color : "#fff",
                        },
                        "&:focus" : {
                            backgroundColor : "rgb(54, 107, 125)",
                            color : "#fff",
                        }
                    },
                    "&.MuiButton-containedWarning" : {
                        "&:active" : {
                            backgroundColor : "rgb(119, 86, 36)",
                            color : "#fff",
                        },
                        "&:focus" : {
                            backgroundColor : "rgb(119, 86, 36)",
                            color : "#fff",
                        }
                    },
                    "&.MuiButton-containedError" : {
                        "&:active" : {
                            backgroundColor : "rgb(116, 53, 53)",
                            color : "#fff",
                        },
                        "&:focus" : {
                            backgroundColor : "rgb(116, 53, 53)",
                            color : "#fff",
                        }
                    }
                }
            }
        },
        MuiButtonGroup : {
            styleOverrides: {
                root : {
                    "& .MuiButtonGroup-grouped:not(:last-of-type)" : {
                        borderColor : "1px solid #e7e7e738"
                    },
                    "& .MuiButtonGroup-grouped:not(:first-of-type)" : {
                        borderLeft : "1px solid #00000045"
                    }
                }
            }
        },
        MuiPagination : {
            styleOverrides : {
                root : {
                    "& .MuiPagination-ul li" : {
                        margin : 0,
                        padding : 0,
                    }
                }
            }
        },
        MuiTextField    :{
            styleOverrides: {
                root : {
                    // backgroundColor : "transparent",
                    "& label": {
                        transform : 'translate(12px, 7px) scale(1)',
                        fontSize : ".85rem",
                        display : "inline-block",
                        "&.Mui-focused": {
                          transform: "translate(15px, -9px) scale(.8)",
                        },
                        "&.MuiFormLabel-filled" : {
                            transform: "translate(15px, -9px) scale(.8)",
                        }
                    },
                    "& .MuiInputBase-root" : {
                        "&.Mui-focused" : {
                            "& input" : {
                                boxShadow : "none",
                                backgroundColor : "transparent",
                                color : "inherit",
                                border : "none",
                                outline : "0",
                            } 
                        },
                        
                        "& .MuiInputBase-inputSizeSmall" : {
                            
                            padding : "0 10px",
                            height : "32px",
                            display: "flex",
                            fontSize : ".85rem",
                            backgroundColor : "transparent",
                        },
                        
                    },
                    "&.cc-select" : {
                        "&.table-pagination" : {
                            backgroundColor : "#1f1f1f",
                            borderRadius : "4px",
                        },
                        backgroundColor : "#333",
                    },
                    "&.table-pagination" : {
                        outline : "0",
                        padding :"0",
                        margin : "0",
                        border : "0",

                        "& .MuiInputBase-root" : {
                            padding : "0",
                            width : "auto",
                        },
                        
                        "& input" : {
                            maxWidth : "53px",
                            width : "auto",
                            textAlign : "right",

                            display : "table-cell",
                            padding : "4px 0 4px 15px",

                        },

                        "& .MuiMenuItem-root" :{
                            textAlign : "right",
                        },

                        "& .MuiOutlinedInput-notchedOutline" : {
                            width : "auto",
                            border : "none",
                        }
                    }
                },
                
            },
            variants: [
                {
                    props: { size: 'medium' },
                    style: {
                        "& input" : {
                            height : "36.5px",
                            fontSize : ".95rem"
                        },
                        "& label": {
                            transform : 'translate(12px, 9px) scale(1)',
                            display : "inline-block",
                            fontSize : ".95rem",
                            "&.Mui-focused": {
                              transform: "translate(14.5px, -9px) scale(.8)",
                            },
                            "&.MuiFormLabel-filled" : {
                                transform: "translate(14.5px, -9px) scale(.8)",
                            }
                        },
                        
                    },
                },
                {
                    props: { size: 'large' },
                    style: {
                        "& input" : {
                            height : "42.25px",
                            
                        },
                        "& label": {
                            transform : 'translate(14px, 9px) scale(1)',
                            display : "inline-block",
                            fontSize : "1rem",
                            "&.Mui-focused": {
                              transform: "translate(13.5px, -9px) scale(.8)",
                            },
                            "&.MuiFormLabel-filled" : {
                                transform: "translate(13.5px, -9px) scale(.8)",
                            }
                        },
                        
                    },
                },
            ]
            
        },
        MuiTableContainer : {
            styleOverrides : {
                root : {
                    maxHeight : "calc(100vh - (5.5rem + 70px + 71.33px + 64px + 50px))",
                }
            }
        },
        MuiTableCell : {
            styleOverrides : {
                root : {
                    backgroundColor : "none",
                }
            }
        },
        MuiPaper : {
            styleOverrides: {
                root : {
                    backgroundColor : "#454545",
                    "&.container"   : {
                        padding : ".7rem",
                        backgroundColor : "#2b2b2bbf",
                    }
                }
            },
        },
        MuiButton : {
            styleOverrides: {
                root : {
                    borderRadius : "4px!important",
                }
            }
        },
        MuiButtonGroup : {
            styleOverrides: {
                root : {
                    "& .MuiButtonGroup-grouped:not(:last-of-type)" : {
                        borderTopRightRadius: "0!important",
                        borderBottomRightRadius: "0!important",
                        // borderRight: "1px solid #bdbdbd",
                    },
                    "& .MuiButtonGroup-grouped:not(:first-of-type)" : {
                        borderTopLeftRadius: "0!important",
                        borderBottomLeftRadius: "0!important",
                        // borderRight: "1px solid #bdbdbd",
                    }
                }
            }
        }
    },
    overrides: {
        MuiAppBar: {
            colorInherit: {
                backgroundColor: '#607f83',
                color: '#fff',
            },
        },
        MuiSwitch: {
            root: {
                width: 42,
                height: 26,
                padding: 0,
                margin: 8,
            },
            switchBase: {
                padding: 1,
                '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                    transform: 'translateX(16px)',
                    color: '#fff',
                    '& + $track': {
                    opacity: 1,
                    border: 'none',
                    },
                },
            },
            thumb: {
                width: 24,
                height: 24,
            },
            track: {
                borderRadius: 13,
                border: '1px solid #bdbdbd',
                backgroundColor: '#fafafa',
                opacity: 1,
                transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
        },
    },
    props: {
        MuiAppBar: {
            color: 'inherit',
        },
    },
    transitions : {
        duration : {
            shortest : 150,
            shorter : 200,
            short : 250,
            standard : 300,
            complex : 375,
            enteringScreen : 225,
            leavingScreen : 195,
        }
    }
});
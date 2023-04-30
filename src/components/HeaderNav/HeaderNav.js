import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { GlobalStateContext } from "../../store/GlobalState";
import NavButton from "../NavButton";


export default function HeaderNav() {

    const [GlobalState] = useContext(GlobalStateContext);



    return (
        <nav className="cc-header-nav">
            <ul>
                {

                    GlobalState.NavItems.filter(item => item.location === "header").map(item => {
                        return(
                            <li key={item.id}>
                                <NavButton page={item.page} hasFrameWindow={item.hasFrameWindow} >
                                    {item.label}{/*  - {item.id} */}
                                </NavButton>

                            </li>
                        );
                    })

                }
                {/* <li>
                    <NavButton page={"Browser Scraper"}>
                        Browser Scraper
                    </NavButton>
                </li> */}

            </ul>
            
        </nav>
    )
}
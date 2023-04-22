import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Footer from "../components/Footer";
import EmptyCard from "../components/EmptyCard";

import BodyContainer from "../components/BodyContainer";


export default function Layout({children, mainBodyAnimationEndHandler})    {

    const [sidebar, setSidebar] = useState(true);
    const [mainClassName, setMainClassName] = useState("");

    const showSidebarClickHandler = (e) => {
        setSidebar(prev => {
            setMainClassName(prevClassName => {

                if(prev === true)  {
                    return "";
                } else  {
                    return "with-side-bar";
                }

            });
            return !prev;
        });
    }

    useEffect(() => {

        setMainClassName(prevClassName => {

            if(sidebar)  {
                return "with-side-bar";
            } else  {
                return "";
            }

        });

    }, [])


    

    return (
        <EmptyCard className="main-empty-card">
            <Header className="flex col center-left" showSidebarClickHandler={showSidebarClickHandler} menuOpen={sidebar} />
            <BodyContainer>
                <Sidebar sidebarShown={sidebar}>
                </Sidebar>
                <Main className={mainClassName} mainBodyAnimationEndHandler={mainBodyAnimationEndHandler} >
                    {children}
                </Main>
            </BodyContainer>
            
            <Footer></Footer>
        </EmptyCard>
    
    )


}
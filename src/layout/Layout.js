import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Footer from "../components/Footer";
import EmptyCard from "../components/EmptyCard";

import BodyContainer from "../components/BodyContainer";

export default function Layout({children})    {

    return (
        <EmptyCard className="main-empty-card">
            <Header className="flex col center-left" />
            <BodyContainer>
                <Sidebar>
                </Sidebar>
                <Main>
                    {children}
                </Main>
            </BodyContainer>
            
            <Footer></Footer>
        </EmptyCard>
    
    );

}
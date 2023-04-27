import React from "react";
import { GlobalStateProvider } from "./GlobalState";



export default function StoreProvider({children}) {

    return (
        <>
        <GlobalStateProvider>
            {children}
        </GlobalStateProvider>
        </>
    )

}
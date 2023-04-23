import React from "react";
import { AppWindowsProvider } from "./AppWindows";



export default function StoreProvider({children}) {

    return (
        <>
        <AppWindowsProvider>
            {children}
        </AppWindowsProvider>
        </>
    )

}
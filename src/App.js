import React from "react";
import MainComponent from "./MainComponent";
import { ThemeProvider } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'
import {theme} from "./theme";

import "./shared/css/reset.scss";
import "./shared/css/main.scss";


const App = () =>{
    return (
        <ThemeProvider theme={theme}>
            <ScopedCssBaseline enableColorScheme>
                <div className="app">
                    <MainComponent></MainComponent>
                </div>
            </ScopedCssBaseline>
        </ThemeProvider>
    )
}

export default App
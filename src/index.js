import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import './MuiClassNameSetup';

async function awaitContainer(selector) {
    await new Promise(resolve => {
        let interval = setInterval(() => {

            if(document.querySelector(selector))  {
                clearInterval(interval);
                resolve();
            }
            
        }, 10)
    })
}

(async function(){

    console.log({message : "We Are loading the Scraper Widget UI"});

    await awaitContainer("#cc-electron-scraper-ui-container");


    await awaitContainer("#cc-electron-scraper-ui-container");

    const root = createRoot(document.getElementById('cc-electron-scraper-ui-container'));
    root.render(<App />);


    console.log({message : "Scraper Widget UI was successfully loaded"});


}());


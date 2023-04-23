import React from "react";

const {ipcRenderer} = window.require("electron");

export default function useNewAppWindowHandler()  {
    return function(e)  {
        ipcRenderer.send("new-app-instance", {message : "Please spawn a new app."});
    }
}
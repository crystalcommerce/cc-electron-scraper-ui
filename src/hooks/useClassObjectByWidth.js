import React, { useState, useEffect } from "react";
import useWindowWidth from "./useWindowWidth";

export default function useClassObjectByWidth(classObject)    {

    if(!classObject) {
        classObject = {
            xs : "",
            sm : "",
            md : "",
            lg : "",
            xlg : "",
        };
    }
    
    let windowWidth = useWindowWidth(),
        [selectedClassByWidth, setSelectedClassByWidth] = useState(classObject.xs);
        
        

    useEffect(() => {
        // mobile
        if(windowWidth >= 200 && windowWidth <= 580)   {
            setSelectedClassByWidth(state => classObject.xs);
            // console.log({className, windowWidth, size : "xs"});
        } 
        // tablet
        else if(windowWidth >= 581 && windowWidth <= 768) {
            setSelectedClassByWidth(state => classObject.sm);
            // console.log({className, windowWidth, size : "sm"});
        } 
        // laptop
        else if(windowWidth >= 769 && windowWidth <= 1200) {
            setSelectedClassByWidth(state => classObject.md);
                // console.log({className, windowWidth, size : "md"});
        } 
        // pc
        else if(windowWidth >= 1201 && windowWidth <= 1920) {
            setSelectedClassByWidth(state => classObject.lg);
                // console.log({className, windowWidth, size : "lg"});
        } 
        // ultra
        else if(windowWidth >= 1921) {
            setSelectedClassByWidth(state => classObject.xlg);
            // console.log({className, windowWidth, size : "xlg"});
        }


    }, [windowWidth]);


    return selectedClassByWidth;

}

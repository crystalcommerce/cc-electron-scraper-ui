import React, { useState, useEffect } from "react";
import useWindowWidth from "./useWindowWidth";

export default function useObjectPropsByWidth(props, objectPropsByWidth)    {

    if(!objectPropsByWidth) {
        objectPropsByWidth = {
            xs : {},
            sm : {},
            md : {},
            lg : {},
            xlg : {},
        };
    }
    
    let windowWidth = useWindowWidth(),
        [newProps, setNewProps] = useState({...props}),
        [propObject, setPropObject] = useState(objectPropsByWidth.xs);
        
    for(let key in props)   {
        newProps[key] = props[key];
    }

    const updateProps = (widthKey) => {
        setPropObject(state =>{ 
            let obj = objectPropsByWidth[widthKey];
            setNewProps(state => {
                for(let key in obj)  {
                    state[key] = obj[key];
                }
                return state;
            })
            return obj
        });
    }

    useEffect(() => {
        // mobile
        if(windowWidth >= 200 && windowWidth <= 580)   {
            updateProps("xs")
            // console.log({className, windowWidth, size : "xs"});
        } 
        // tablet
        else if(windowWidth >= 581 && windowWidth <= 768) {
            updateProps("sm");
            // console.log({className, windowWidth, size : "sm"});
        } 
        // laptop
        else if(windowWidth >= 769 && windowWidth <= 1200) {
            updateProps("md");
                // console.log({className, windowWidth, size : "md"});
        } 
        // pc
        else if(windowWidth >= 1201 && windowWidth <= 1920) {
            updateProps("lg");
                // console.log({className, windowWidth, size : "lg"});
        } 
        // ultra
        else if(windowWidth >= 1921) {
           updateProps("xlg");
            // console.log({className, windowWidth, size : "xlg"});
        }


    }, [windowWidth]);
    

    return newProps;

}

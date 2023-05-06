import React, {useState, useEffect, useContext} from "react";

export default function useElementDimensions()  {

    const getDimensions = (element) => {

        if(element)   {

            const currentStyles = getComputedStyle(element);

            return {
                width : Number(currentStyles.width.replace("px", "")),
                height : Number(currentStyles.height.replace("px", "")),
                paddingTop : Number(currentStyles.paddingTop.replace("px", "")),
                paddingBottom : Number(currentStyles.paddingBottom.replace("px", "")),
                paddingLeft : Number(currentStyles.paddingLeft.replace("px", "")),
                paddingRight : Number(currentStyles.paddingRight.replace("px", "")),
                offsetTop : element.offsetTop,
                offsetLeft : element.offsetLeft,
            }
        } else  {
            return {
                width : 0,
                height : 0,
                paddingTop : 0,
                paddingBottom : 0,
                paddingLeft : 0,
                paddingRight : 0,
                offsetTop : 0,
                offsetLeft : 0,
            };
        }
    }

    const animationHandler = (callback) => {
        let interval = null,
            count = 0;
        
        function startHandler()   {
            if(interval)    {
                clearInterval(interval);
                count = 0;
                interval = null;
            }
            
            callback(count);
            interval = setInterval(() => {
                // console.log("Start Animation");
                callback(count);
                count++;
                if(count >= 20)    {   
                    endHandler();
                }
    
            }, 1);

        }

        function endHandler()   {

            if(interval)    {
                clearInterval(interval);
                interval = null;
                count = 0;
            }
            // console.log("End animation")
            callback(count);

            

        }

        return { startHandler, endHandler };
    }

    return {getDimensions, animationHandler}
}

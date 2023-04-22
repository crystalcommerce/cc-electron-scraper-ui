import React, {useState, useEffect} from "react";

export default function useElementDimensions(elRef, hidden, dimensionsUpdate, callback) {

    const [stylesObject, setStylesObject] = useState({});

    function getStylesObjectHandler(e){

        if(elRef && elRef.current)   {

            const elObject = elRef.current;

            const currentStyles = getComputedStyle(elObject);

            setStylesObject(prevState => {

                const updatedStyles = {
                    width : Number(currentStyles.width.replace("px", "")),
                    height : Number(currentStyles.height.replace("px", "")),
                    paddingTop : Number(currentStyles.paddingTop.replace("px", "")),
                    paddingBottom : Number(currentStyles.paddingBottom.replace("px", "")),
                    paddingLeft : Number(currentStyles.paddingLeft.replace("px", "")),
                    paddingRight : Number(currentStyles.paddingRight.replace("px", "")),
                    offsetTop : elObject.offsetTop,
                    offsetLeft : elObject.offsetLeft,
                };
                callback(updatedStyles);
                return updatedStyles;
            });

        } else  {

            setStylesObject(prevState => {
                const updatedStyles = {
                    width : 0,
                    height : 0,
                    paddingTop : 0,
                    paddingBottom : 0,
                    paddingLeft : 0,
                    paddingRight : 0,
                };

                callback(updatedStyles);
                return updatedStyles;
            });
        }

    }

    useEffect(() => {

        getStylesObjectHandler();

        window.addEventListener("resize", getStylesObjectHandler);
        window.addEventListener("load", getStylesObjectHandler);


        return () => {
            window.removeEventListener("resize", getStylesObjectHandler);
            window.removeEventListener("load", getStylesObjectHandler);
        }

    }, [hidden, dimensionsUpdate]);


    return stylesObject;

}
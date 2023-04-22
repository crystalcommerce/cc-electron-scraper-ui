import React, {useEffect, useState} from "react";

export default function useMaxImageDimensions(containerRef) {

    const [images, setImages] = useState([]);
    const [maxHeight, setMaxHeight] = useState(0);
    const [maxWidth, setMaxWidth] = useState(0);
    const [dimensions, setDimensions] = useState([]);


    const checkAllDimensions = (images) => {
        return new Promise(resolve => {
            let results = [],
                interval = setInterval(() => {
                    results = [];
                    images.forEach(item => {
                        results.push(parseInt(window.getComputedStyle(item).height) && parseInt(window.getComputedStyle(item).width));
                    });

                    if(results.every(res => res))   {
                        clearInterval(interval);
                        resolve();
                    }

                }, 10);
        })
    }


    useEffect(() => {
        setImages(state => {
            return Array.from(containerRef.current.querySelectorAll("img"));
        })
    }, [containerRef]);

    useEffect(() => {

        if(images.length)   {

            checkAllDimensions(images)
                .then(() => {

                    setDimensions(state => {
                        return images.map(item => {
                            return {
                                height : parseInt(window.getComputedStyle(item).height),
                                width : parseInt(window.getComputedStyle(item).width)
                            }
                        })
                    })
                });
                     
        }

    }, [images]);


    useEffect(() => {
        if(dimensions.length)   {
            setMaxHeight(state => {
                return Math.max(...dimensions.map(item => item.height))
            });
    
            setMaxWidth(state => {
                return Math.max(...dimensions.map(item => item.width));
            });
        }
    }, [dimensions]);


    useEffect(() => {
        containerRef.current.style.height = maxHeight + "px";
        containerRef.current.style.maxWidth = "100%";
        containerRef.current.style.maxHeight = "100vh";
        
    }, [maxWidth, maxHeight])

}
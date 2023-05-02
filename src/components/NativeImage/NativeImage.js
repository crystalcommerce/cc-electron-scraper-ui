import React, { useEffect } from "react";
import useNativeImageHook from "../../hooks/useNativeImageHook";


export default function NativeImage({src, alt, srcset, sizes, height, width, useMap, localFile })  {

    const {imageSrc} = useNativeImageHook(src);
    
    const usedImageSrc = localFile ? src : imageSrc;

    return (
        <>
            <img src={usedImageSrc} alt={alt} height={height} width={width} sizes={sizes} srcSet={srcset} useMap={useMap} />
        </>
    )


}
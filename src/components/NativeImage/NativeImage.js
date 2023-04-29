import React, { useEffect } from "react";
import useNativeImageHook from "../../hooks/useNativeImageHook";


export default function NativeImage({src, alt, srcset, sizes, height, width, useMap })  {

    const {imageSrc} = useNativeImageHook(src);

    return (
        <img src={imageSrc} alt={alt} height={height} width={width} sizes={sizes} srcSet={srcset} useMap={useMap} />
    )


}
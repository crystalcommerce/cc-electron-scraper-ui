import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";

export default function TableImage({imageUris, className})    {

    return (
        <div style={{width : "200px;"}}>
            <ImageSlider imageUris={imageUris} className={className}></ImageSlider>
        </div>
    )

}
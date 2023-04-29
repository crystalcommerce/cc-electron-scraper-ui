import React, {useRef, useState} from "react";
import useMaxImageHeight from "../../hooks/useMaxImageDimensions";
import {NavigateNext as NavigateNextIcon, NavigateBefore as NavigateBeforeIcon} from '@mui/icons-material';
import NativeImage from "../NativeImage/NativeImage";

export default function ImageSlider({imageUris, className})   {

    imageUris = Array.isArray(imageUris) ? imageUris : [];

    const [currentImage, setCurrentImage] = useState(0);

    const imageContainer = useRef();

    

    const prevImageHandler = () => {
        setCurrentImage(state => {
            return state > 0 ? state - 1 : imageUris.length - 1;
        });
    }

    const nextImageHandler = () => {
        setCurrentImage(state => {
            return state < imageUris.length - 1 ? state + 1 : 0;
        });
    }

    useMaxImageHeight(imageContainer);

    return (
        <div className={`cc-image-slider ${className ? ` ${className}` : ""}`}>
            
            <div className='cc-image-slider-outer-container' ref={imageContainer}>
            <button className={'image-slider-button prev'} onClick={prevImageHandler}><NavigateBeforeIcon /></button>
            {imageUris.map((item, index) => {
                return (
                    <div key={`${index}-${item}`} className={`cc-image-container ${index === currentImage ? "current-image" : "hidden"}`}>
                        <NativeImage  src={item} />
                    </div>
                )
            })}
            <button className={'image-slider-button next'} onClick={nextImageHandler}><NavigateNextIcon /></button>
            </div>
            
        </div>
    );

}
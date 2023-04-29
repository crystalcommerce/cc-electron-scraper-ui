import React, { useEffect, useState } from "react";

const { nativeImage } = window.require('electron');

function fetchImageToDataUrl(imageUrl) {
    return fetch(imageUrl)
        .then(response => {
                return response.blob()
        })
        .then(blob => {
            return new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = function() {
                    resolve(reader.result)
                }
                reader.readAsDataURL(blob)
            })
        });
}

export default function useNativeImageHook(src) {

    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {

        fetchImageToDataUrl(src)
            .then(dataUrl => {

                const imageObject = nativeImage.createFromDataURL(dataUrl);

                setImageSrc(imageObject.toDataURL());
            })
    }, []);

    return {imageSrc}
}
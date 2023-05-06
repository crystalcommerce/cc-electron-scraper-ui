import React, { useEffect, useState } from "react";

const { nativeImage } = window.require('electron');

function fetchImageToDataUrl(imageUrl) {
    return fetch(imageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            return new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = function() {
                    resolve(reader.result)
                }
                reader.readAsDataURL(blob)
            })
        })
        .catch(error => {
            console.error('There was a problem fetching the image:', error);
            throw error;
        });
}


export default function useNativeImageHook(src) {

    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {

        fetchImageToDataUrl(src)
            .then(dataUrl => {
                setImageSrc(prev => dataUrl);
            })
            .catch(error => {
                setImageSrc(prev => src);
            });
    }, []);

    return {imageSrc}
}
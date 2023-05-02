import React, { useState, useEffect } from "react";

export default function useDebounce(callback, delay = 500) {
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        return () => {
        clearTimeout(timerId);
        };
    }, [timerId]);

    function debouncedCallback(...args) {
        clearTimeout(timerId);
        const id = setTimeout(() => {
        callback(...args);
        }, delay);
        setTimerId(id);
    }

    return debouncedCallback;
}

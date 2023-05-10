import {useState, useEffect, useContext} from "react";
import { GlobalStateContext } from "../store/GlobalState";

export default function useFetch(apiEndPoint, fetchOptions, initialValue = [])  {

    let [data, setData] = useState(initialValue),
        [isLoading, setIsLoading] = useState(false),
        [hasError, setHasError] = useState(false),
        [fetchMessage, setFetchMessage] = useState(null),
        abortCont = new AbortController(),
        [GlobalState] = useContext(GlobalStateContext),
        [baseUrl, setBaseUrl] = useState(null);


    useEffect(() => {
        
        if(!baseUrl)    {
            setBaseUrl(prev => GlobalState.AppWindow.serverUrl);
        }
        

    }, [GlobalState]);

    useEffect(() => {
        setIsLoading(true);
        setFetchMessage(prev => "We are currently fetching the data from the database.");
        setHasError(false);

        if(baseUrl) {
            fetch(`${baseUrl}${apiEndPoint}`, {
                ...fetchOptions,
                headers : {
                    "Content-type" : "application/json",
                },
                signal : abortCont.signal
            })
            .then(res => {
                if(!res.ok) {
                    throw Error("We couldn't fetch the data");
                }
                return res.json();
            })
            .then(jsonData => {
                setIsLoading(false);
                setHasError(false);
                setFetchMessage(prev => "We have successfully fetched the data.");
                setData(prev => jsonData);
            })
            .catch(err => {
                if(err.name !== "AbortError")   {
                    setIsLoading(false);
                    setHasError(true);
                    setFetchMessage(err.message);
                }
            })
    
            return () => abortCont.abort();
        }
        
    }, [baseUrl]);

    return {data, setData, isLoading, hasError, fetchMessage};
}
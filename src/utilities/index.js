export function getAllObjectKeys(objects) {
    return objects.reduce((a, b) => {
        for(let key of Object.keys(b))  {
            if(!a.includes(key))    {
                a.push(key);
            }
        }
        return a;
    }, []);
}

export async function apiRequest(url, options = {}, accessLocalHost = false)   {
    let headers = {
            "Content-Type" : "application/json",
            "x-auth-token" : authToken,
        },
        requestOptions = accessLocalHost ? {...options, headers} : options,
        res = await fetch(url, requestOptions),
        data = await res.json();

    return data;
}

export async function postDataArray(url, data, options = {})   {
    let requestPromises = data.map(item => {
        return async function() {
            try {
                let createResult = await apiRequest(url, {
                    method : "POST",
                    body : JSON.stringify(item, null, 4),
                    ...options
                });

                console.log(createResult);
                return createResult.data;
            } catch(err)    {
                return item;
            }
        }
    });

    return await Promise.all(requestPromises.map(item => item()));
}

export async function scrollToBottom(num = 150)  {
    let totalHeight = document.body.offsetHeight - window.innerHeight,
        currentScroll = 0;

    function scroll()   {
        currentScroll = window.scrollY;
    }
    
    window.addEventListener("scroll", scroll);

    await new Promise(resolve => {
        let interval = setInterval(() => {
            totalHeight = document.body.offsetHeight - window.innerHeight;
            window.scrollTo(0, currentScroll + 100);
            if(currentScroll >= totalHeight - num) {

                console.log({currentScroll, totalHeight})
                clearInterval(interval);
                window.removeEventListener("scroll", scroll);
                resolve();
            }
        }, 25);
    });
    
}

export function isObjectInArray(object, array = [], keysToBeChecked = []) {
    return array.some(item => {
        let results = [];
        if(keysToBeChecked.length)  {
            for(let key of keysToBeChecked)    {
                results.push(object[key] === item[key]);
            }
        } else  {
            for(let key in object)    {
                results.push(object[key] === item[key]);
            }
        }
        
        return results.every(res => res);
    });
}

export async function scrollToTop()   {
    let totalHeight = document.body.offsetHeight - window.innerHeight,
        currentScroll = window.scrollY;

    function scroll()   {
        currentScroll = window.scrollY;
    }
    
    window.addEventListener("scroll", scroll);

    await new Promise(resolve => {
        let interval = setInterval(() => {
            window.scrollTo(0, currentScroll - 100);
            if(currentScroll <= 0) {

                console.log({currentScroll, totalHeight})
                clearInterval(interval);
                window.removeEventListener("scroll", scroll);
                resolve();
            }
        }, 25);
    });
}

export function generateUuid(){
    let dt = new Date().getTime();
        
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
}

export function isInArray(arr, data)    {
    return arr.find(item => {
        let result = [],
            dataKeys = Object.keys(data),
            itemKeys = Object.keys(item);

        for(let props in data)    {
            result.push(item[props] === data[props]);
        } 

        return result.every(res => res) && dataKeys.length === itemKeys.length;
    });
}

export async function waitForSelector(callback, numberOfWaits = 300)  {
    let node = callback();
    await new Promise(resolve => {
        if(node)    {
            resolve();
        }
        let i = 0,
            interval = setInterval(() => {
                node = callback();
                if(node || i >= numberOfWaits)    {
                    clearInterval(interval);
                    resolve();
                }
                i++;
            }, 100);

    });
    return node;
}

export async function waitForCondition({conditionCallback, onTrueCallback, messageCallback})   {
    conditionCallback = conditionCallback ? conditionCallback : () => true;
    messageCallback = messageCallback ? messageCallback : () => {};
    onTrueCallback = onTrueCallback ? onTrueCallback : () => {};
    await new Promise(resolve => {
        messageCallback();
        let i = 0,
            interval = setInterval(() => {
                if(conditionCallback())    {
                    onTrueCallback();
                    clearInterval(interval);
                    resolve();
                }
                if(i === 100)   {
                    messageCallback();
                    i = 0;
                }
                i++;
            }, 100);
    });
}

export function toUrl(str) {
    return Array.from(str.toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, " ").split(" ")).reduce((a, b) => {
        if(b.trim() !== "") {
            a.push(b);
        }
        return a;
    }, []).join("-");
}

export function toCapitalize(str) {
    return str.split("").map((char, index) =>  index === 0 ? char.toUpperCase() : char).join("").trim();
}

export function toCapitalizeAll(str)   {
    return str.split(" ").map(item => toCapitalize(item)).join(" ");
}

export function objectToQueryString(object) {

    return Object.keys(object).reduce((a, b) => {

        if(object[b])   {
            a.push(`${encodeURIComponent(b)}=${encodeURIComponent(object[b])}`)
        }

        return a;
    }, []).join("&");
    
}

export function queryStringToObject(urlString, trailingSlash = true)   {
    let url = new URL(urlString),
        queryString = url.search.length ? url.search.slice(1) : "",
        origin = url.origin.charAt(url.origin.length - 1) === "/" ? url.origin.slice(0, -1) : url.origin,
        urlPath = url.pathname.split("/").filter(item => item.length > 0).join("/"),
        pathname = trailingSlash ? `${urlPath}/` : urlPath,
        queryArr = queryString.length ? queryString.split("&") : [];

    return {
        queryObject : queryArr.reduce((a,b) => {
            let [key, val] = b.split("=");
            a[decodeURIComponent(key)] = decodeURIComponent(val);
            return a;
        }, {}),
        originalUrl : urlString,
        origin,
        pathname : pathname,
        urlWithoutQueryString : [origin, pathname].join("/"),
    };
}

export function ccEncodeObject(obj)   {
    try {
        let result = encodeURIComponent(btoa(JSON.stringify(obj)));
        return result;
    } catch (err)   {
        return encodeURIComponent(JSON.stringify(obj));
    }
    
}

export function ccDecodeObject(str)    {
    try {
        let result = JSON.parse(atob(decodeURIComponent(str)));
        return result;
    } catch (err)   {
        return JSON.parse(decodeURIComponent(str));
    }
}

export async function moderator(arr, callback, bulkCount = 5) {

    let firstIndex = 0,
        lastIndex = bulkCount;
    
    async function execute(...args)   {

        let i = 0;

        while(i < arr.length)   {

            let slicedArr = arr.slice(firstIndex, lastIndex);
            
            
            await callback(slicedArr, firstIndex, lastIndex);

            if(i + bulkCount < arr.length)  {
                i += bulkCount;
                firstIndex = i;
                lastIndex = i + bulkCount;
            } else {
                i += arr.length - i;
                firstIndex = i;
                lastIndex = arr.length;
            }

            // console.log(firstIndex, lastIndex);

        }

    }

    await execute();
    
    
}

export async function slowDown(timeDelay = false)  {
    let delay = timeDelay ? timeDelay : 7747;
    await new Promise(resolve => setTimeout(resolve, delay));
}

export async function downloadEncodedText(productObjects, productProps)   {
    let element = document.createElement("a"),
        fileName = `${toUrl("enc" + " " + Object.keys(productProps).reduce((a, b) => {
            if(productProps[b] && productProps[b].trim().length)   {
                a.push(productProps[b].trim());
            }
            return a;
        }, []).join(" ") + ` __dt-${Date.now()}` + ` __total-${productObjects.length}`)}.txt`;

    element.style.display = "none";
    element.setAttribute("href", `data:text/plain;charset=utf-8, ${btoa(encodeURIComponent(JSON.stringify(productObjects)))}`);
    element.setAttribute("target", "_blank");
    element.setAttribute("download", fileName);
    element.setAttribute("class", "__cc_download-encoded-text");

    document.body.appendChild(element);
    
    await waitForSelector(() => document.querySelector(".__cc_download-encoded-text"));
    element.click();
    await slowDown(3434);
}

export function getValidatedPropValues(obj, propNames = [], callback = (value) => {})    {

    if(!obj)    {
        return null;
    }
        
    let objValue = null;
    propNames.reduce((object, key) => {
    
        if(object[key]) {
            object = object[key];
            objValue = object;
        } else  {
            object = {};
            objValue = null;
        }

        callback(objValue);
        
        return object;

    }, obj);

    return objValue;

}

export function toNormalString(str, previousFormat = "camel-case")    {
    if(previousFormat === "camel-case") {
        str = str.replace(/([A-Z])/g, (char) => ` ${char.toUpperCase()}`);
    } else if(previousFormat === "underscored") {
        str = str.split("_").map(item => toCapitalize(item)).join(" ");
    } else  {
        str = str.split("-").map(item => toCapitalize(item)).join(" ");
    }
    return toCapitalize(str);
}

export function getInitials(str)  {
    return typeof str === "string" && str.length ? toNormalString(str.trim()).split(" ").map(word => word.charAt(0).toUpperCase()).join("") : null;
}

export function toCamelCase(str, url=false, initialCap=false)  {
    let separator = url ? "-" : " ";
    return str.toLowerCase().split(`${separator}`).map((item, index) => index === 0 && !initialCap ? item : toCapitalize(item)).join("");
}


export function createColumns(columns, styledColumnObjects, showIndex =false) {

    let imageUris = columns.includes("imageUris");

    columns = columns.filter(item => item !== "imageUris");

    let columnObjects = columns.map((item) => {
        let obj = {},
            foundColumn = styledColumnObjects.find(styledColumnObject => styledColumnObject.key === item);
        if(foundColumn)  {
            delete(foundColumn.key);
            Object.assign(obj, foundColumn);
        }
        return {
            id : item,
            label : toCapitalizeAll(toNormalString(item)),
            style : obj.style || {
                minWidth : 170
            },
            align : obj.align,
            format : obj.format ? obj.format : (value) => value,
        }
    });

    if(imageUris)   {
        columnObjects.unshift({
            id : "scrapedImages",
            label : "Scraped Images",
            align : "center"
        });
    }

    if(showIndex)   {
        columnObjects.unshift({
            id : "index",
            label : "#",
            style : {
                minWidth : 70,
            },
            align : "center",
        })
    }

    return columnObjects;

}

export function stylesToObject(selector)    {

    let el = document.querySelector(selector),
        currentStyles = el.getAttribute("style");

    if(!currentStyles)  {
        currentStyles = "";
    }

    let stylesArr = currentStyles.split(";")
            .map(item => item.trim())
            .filter(item => item !== ""),
        styleObject = stylesArr.reduce((a, b) => {
            let [key, val] = b.split(":").map(item => item.trim());
            if(val && val.length) {
                a[key] = val;
            }
            
            return a;
        }, {});

    return styleObject;

}

export function styleObjectToString(styleObj)   {
    return Object.keys(styleObj).reduce((arr, key) => {
        if(styleObj[key])  {
            arr.push(`${key}:${styleObj[key]}`);
        }
        return arr;
    }, []).join("; ")
}

export function debounce(callback, timeDelay = 500)  {

    let timeout;

    return function(...args)   {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            callback(...args);

            clearTimeout(timeout);

        }, timeDelay);

    }

}

export function urlConstructor(urlString) {
    // Step 1: Identify the parts of the URL
    let protocol = "";
    let domain = "";
    let path = "";
    let queryParams = "";

    // Step 2: Determine the protocol
    if (urlString.startsWith("http://")) {
        protocol = "http://";
        urlString = urlString.slice(protocol.length);
    } else if (urlString.startsWith("https://")) {
        protocol = "https://";
        urlString = urlString.slice(protocol.length);
    } else {
        protocol = "https://";
    }

    // Step 3: Extract the domain or hostname
    if (urlString.includes("/")) {
        domain = urlString.split("/")[0];
        urlString = urlString.slice(domain.length);
    } else {
    
        domain = urlString;

        if(!domain.includes(".com"))   {
            domain += ".com";
        }

        urlString = "";
    }

    // Step 4: Extract the path or resource
    if (urlString.includes("?")) {
        path = urlString.split("?")[0];
        queryParams = urlString.slice(path.length);
    } else {
        path = urlString;
    }

    // Step 5: Extract the query parameters
    if (queryParams.startsWith("?")) {
        queryParams = queryParams.slice(1);
    }

    // Step 6: Assemble the URL
    let url = protocol + domain + path;
        if (queryParams) {
        url += "?" + queryParams;
    }

    return url;
}
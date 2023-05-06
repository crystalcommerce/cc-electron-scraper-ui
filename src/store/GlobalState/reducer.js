const ACTIONS = {
    // App window state
    "SET_APP_WINDOW_DETAILS" : "set-app-window-details",
    "SET_APP_LOADING_STATE" : "set-app-loading-state",

    // multi-state setter utility
    "SET_MULTI_STATE_PROPERTIES" : "set-multi-state-properties",

    // components and page setters
    "SET_ACTIVE_PAGE" : "set-active-page",
    "UPDATE_COMPONENTS" : "update-components",
    
    // Frame Window setters
    "CREATE_FRAME_WINDOW" : "create-frame-window",
    "UPDATE_FRAME_WINDOWS" : "update-frame-window",
    "CLEAR_FRAME_WINDOWS" : "clear-frame-windows",

    // browser windows/tabs setter;
    "UPDATE_BROWSER_TABS" : "update-browser-tab",
}

function setAppWindowDetails(state, action) {
    let {AppWindow, AppWindowId} = state;

    if(action.payload.AppWindowId)  {
        AppWindowId = action.payload.AppWindowId;
    }
    
    if(action.payload.AppWindow)    {
        for(let key in action.payload.AppWindow)    {
            AppWindow[key] = action.payload.AppWindow[key];
        }
    }
    
    return {...state};

}

function setMultiStateProperties(state, action) {

    let obj = {};

    for(let reducerAction of action.payload)  {

        let newObject = reducer(state, reducerAction);

        obj = {...obj, ...newObject};

    }


    return obj;
}

function setAppLoadingState(state, action)  {

    let {AppWindow} = state;

    AppWindow.isLoading = action.payload;

    return {...state};
}

function updateComponents(state, action)    {
    let {Components} = state;
        
    for(let key in action.payload)  {
        let updatedComponent = action.payload[key],
            component = Components[key];
        
        for(let props in updatedComponent) {
            component[props] = updatedComponent[props];
        }
    }

    return {...state};
}

function clearFrameWindows(state, action)   {
    let {FrameWindows} = state;

    FrameWindows = [];

    return {...state};
}

function updateFrameWindow(state, action)    {
    let { FrameWindows } = state;
    

    for(let FrameWindow of action.payload.FrameWindows) {

        let foundFrame = FrameWindows.find(frameWindow => frameWindow.componentId === FrameWindow.componentId);

        if(foundFrame)  {
            // if it's there we update
            for(let key in FrameWindow) {
                foundFrame[key] = FrameWindow[key];
            }
        } else  {
            // else we push
            // we set the defaults
            FrameWindows.push(FrameWindow);
        }
        
    }

    return {...state};
}

function setActivePage(state, action)    {
    let { Pages } = state,
        foundPage = Pages.find(item => item.page === action.payload.page);
    
    Pages.forEach(item => item.isActive = false);
    foundPage.isActive = action.payload.isActive;

    return {...state};
}

function updateBrowserTabs(state, action)   {
    let {BrowserTabs, Components} = state;
    
    
    
    if(action.payload.operation === "add") {

        // find if it's a duplicate... 
        let foundTab = BrowserTabs.find(item => item.browserWindowId === action.payload.tab.browserWindowId);

        if(!foundTab)   {
            BrowserTabs.forEach(item => {
                if(item.browserWindowId !== action.payload.tab.browserWindowId)  {
                    item.isActive = false;
                } else  {
                    item.isActive = true;
                }
            });
            BrowserTabs.push(action.payload.tab);
        } else  {
            BrowserTabs.forEach(item => {
                if(item.browserWindowId !== action.payload.tab.browserWindowId)  {
                    item.isActive = false;
                } else  {
                    item.isActive = true;
                }
            });
            Object.assign(foundTab, action.payload.tab);
        }
        
    } else if(action.payload.operation === "remove") {

        state.BrowserTabs = BrowserTabs.filter(item => item.browserWindowId !== action.payload.tab.browserWindowId);

        if(!state.BrowserTabs.find(item => item.isActive) && state.BrowserTabs.length)  {
            state.BrowserTabs[state.BrowserTabs.length - 1].isActive = true;
        }
        action.payload.callback(state.BrowserTabs.find(item => item.isActive));

    } else if(action.payload.operation === "activate")  {
   
        BrowserTabs.forEach(item => {
            if(item.browserWindowId !== action.payload.tab.browserWindowId)  {
                item.isActive = false;
            } else  {
                item.isActive = true;
            }
        });

        // action.payload.callback(state.BrowserTabs.find(item => item.isActive));
        
    } else if(action.payload.operation === "update-url")  {

        let foundTab = BrowserTabs.find(item => item.browserWindowId === action.payload.tab.browserWindowId);

        if(foundTab)    {
            Object.assign(foundTab, action.payload.tab);

            if(action.payload.callback) {
                action.payload.callback();
            }
        }

        

    } else if(action.payload.operation === "disable-all-buttons")   {

        BrowserTabs.forEach(item => item.disabled = true);

    } else if(action.payload.operation === "enable-all-buttons")    {

        BrowserTabs.forEach(item => item.disabled = false);

    } else if(action.payload.operation === "disable-add-button")    {

        Components.AddBrowserTabButton.disabled = action.payload.disabled;

    } else if(action.payload.operation === "update-browser-tab-info")   {
        let foundTab = BrowserTabs.find(item => item.browserWindowId === action.payload.tab.browserWindowId);

        for(let key in action.payload.tab)  {
            foundTab[key] = action.payload.tab[key];
        }

    }

    return {...state};
}



const reducer = (state, action) => {

    switch(action.type) {
        case ACTIONS.SET_APP_WINDOW_DETAILS :
            return setAppWindowDetails(state, action);

        case ACTIONS.SET_APP_LOADING_STATE :
            return setAppLoadingState(state, action);

        case ACTIONS.UPDATE_FRAME_WINDOWS :
            return updateFrameWindow(state, action);

        case ACTIONS.CLEAR_FRAME_WINDOWS :
            return clearFrameWindows(state, action);

        case ACTIONS.UPDATE_COMPONENTS :
            return updateComponents(state, action);

        case ACTIONS.SET_ACTIVE_PAGE :
            return setActivePage(state, action);

        case ACTIONS.UPDATE_BROWSER_TABS :
            return updateBrowserTabs(state, action);

        case ACTIONS.SET_MULTI_STATE_PROPERTIES : 
            return setMultiStateProperties(state, action);

        default : 
            return state;
    }
}

export {reducer, ACTIONS};
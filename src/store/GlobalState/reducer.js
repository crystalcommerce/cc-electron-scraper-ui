const ACTIONS = {
    "SET_APP_WINDOW_DETAILS" : "set-app-window-details",
    "UPDATE_FRAME_WINDOWS" : "update-frame-window",
    "UPDATE_COMPONENTS" : "update-components",
    "SET_ACTIVE_PAGE" : "set-active-page",


    "CREATE_FRAME_WINDOW" : "create-frame-window",
}

function setAppWindowDetails(state, action) {
    let {AppWindow, AppWindowId} = state;

    // console.log(action.payload);

    if(action.payload.AppWindowId)  {
        AppWindowId = action.payload.AppWindowId;
    }
    
    if(action.payload.AppWindow)    {
        for(let key in action.payload.AppWindow)    {
            AppWindow[key] = action.payload.AppWindow[key];
        }
    }

    console.log(state);
    
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

function updateFrameWindow(state, action)    {
    let { FrameWindows } = state;

    // console.log(FrameWindows, action.payload.FrameWindows);
    

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



const reducer = (state, action) => {

    switch(action.type) {
        case ACTIONS.SET_APP_WINDOW_DETAILS :
            return setAppWindowDetails(state, action);

        case ACTIONS.UPDATE_FRAME_WINDOWS :
            return updateFrameWindow(state, action);

        case ACTIONS.UPDATE_COMPONENTS :
            return updateComponents(state, action);

        case ACTIONS.SET_ACTIVE_PAGE :
            return setActivePage(state, action);

        default : 
            return state;
    }
}

export {reducer, ACTIONS};
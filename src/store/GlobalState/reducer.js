const ACTIONS = {
    "SET_APP_WINDOW_ID" : "set-app-window-id",
    "UPDATE_FRAME_WINDOW" : "update-frame-window",
    "UPDATE_COMPONENTS" : "update-components",
    "SET_ACTIVE_PAGE" : "set-active-page",


    "CREATE_FRAME_WINDOW" : "create-frame-window",
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
    let { FrameWindow } = state;

    for(let key in action.payload)  {
        FrameWindow[key] = action.payload[key];
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
        case ACTIONS.SET_APP_WINDOW_ID :
            return {...state, AppWindowId : action.payload};


        case ACTIONS.UPDATE_FRAME_WINDOW :
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
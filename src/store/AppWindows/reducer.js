const ACTIONS = {
    "SET_APP_WINDOW_ID" : "set-app-window-id",
    "CREATE_FRAME_WINDOW" : "create-frame-window",
}

// function createFrameWindow()

const reducer = (state, action) => {

    switch(action.type) {
        case ACTIONS.SET_APP_WINDOW_ID :
            return {...state, appWindowId : action.payload}
        default : 
            return state;
    }
}

export {reducer, ACTIONS};
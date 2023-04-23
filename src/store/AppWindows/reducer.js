const ACTIONS = {
    "SET_APP_WINDOW_ID" : "set-app-window-id",


    "SET_FRAME_WINDOW_STYLES" : "set-frame-window-styles",
    "SET_BROWSER_FRAME_ELEMENT" : "set-browser-frame-element",
    "SET_BROWSER_FRAME_HIDDEN" : "set-browser-frame-hidden",
    "SET_BROWSER_FRAME_DIMENSIONS_UPDATE" : "set-browser-frame-dimensions-update",

    // setting sidebar show and hide functions
    "SET_MAIN_COMPONENT_CLASS_NAME": "set-main-component-class-name",
    "SET_SIDEBAR_HIDDEN": "set-sidebar-hidden",


    "CREATE_FRAME_WINDOW" : "create-frame-window",
}

// function createFrameWindow()

const reducer = (state, action) => {

    switch(action.type) {
        case ACTIONS.SET_APP_WINDOW_ID :
            return {...state, appWindowId : action.payload};

        // browserframe element setter
        case ACTIONS.SET_BROWSER_FRAME_ELEMENT : 
            return {...state, browserFrameElement : action.payload};
        case ACTIONS.SET_BROWSER_FRAME_HIDDEN : 
            return {...state, browserFrameElementHidden : action.payload};
        case ACTIONS.SET_BROWSER_FRAME_DIMENSIONS_UPDATE : 
            return {...state, browserFrameDimensionsUpdate : action.payload};

        // sidebar and main layout
        case ACTIONS.SET_MAIN_COMPONENT_CLASS_NAME : 
            return {...state, mainComponentClassName : action.payload};
        case ACTIONS.SET_SIDEBAR_HIDDEN : 
            return {...state, sidebarHidden : action.payload};

        default : 
            return state;
    }
}

export {reducer, ACTIONS};
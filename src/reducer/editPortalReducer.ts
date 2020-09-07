export interface EditPortalState {
    portalId: number | null,
    isClicked: boolean
}

const initialState: EditPortalState = {
    portalId: null,
    isClicked: false
};

export const ACTION_SET_PORTAL_ID = 'ACTION_SET_PORTAL_ID';
export const ACTION_CHANGE_CLICKED_VALUE = 'ACTION_CHANGE_CLICKED_VALUE';

export const setPortalId = (newPortalId: number | null) => {
    return {
        type: ACTION_SET_PORTAL_ID,
        payload: newPortalId
    }
};

export const changeClickedValue = (isClicked: boolean) => {
    return {
        type: ACTION_CHANGE_CLICKED_VALUE,
        payload: isClicked
    }
};

export const editPortalReducer = (state: EditPortalState = initialState, action: any) : EditPortalState => {
    switch(action.type) {
        case ACTION_SET_PORTAL_ID: {
            return {...state, portalId:action.payload}
        }
        case ACTION_CHANGE_CLICKED_VALUE: {
            return {...state, isClicked:action.payload}
        }
        default:
            return state;
    }
};
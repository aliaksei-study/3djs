export interface EditPortalState {
    portalId: number | null
}

const initialState: EditPortalState = {
    portalId: null
};

export const ACTION_SET_PORTAL_ID = 'ACTION_SET_PORTAL_ID';

export const setPortalId = (newPortalId: number | null) => {
    return {
        type: ACTION_SET_PORTAL_ID,
        payload: newPortalId
    }
};

export const editPortalReducer = (state: EditPortalState = initialState, action: any) : EditPortalState => {
    switch(action.type) {
        case ACTION_SET_PORTAL_ID: {
            return {...state, portalId:action.payload}
        }
        default:
            return state;
    }
};
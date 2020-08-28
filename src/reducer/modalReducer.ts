export interface ModalState {
    isAddLineModalShowed: boolean
    isEditPortalModalShowed: boolean
}

const initialState: ModalState = {
    isAddLineModalShowed: false,
    isEditPortalModalShowed: false
};

export const ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE = 'ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE';
export const ACTION_CHANGE_EDIT_PORTAL_SHOWED_VALUE = 'ACTION_CHANGE_EDIT_PORTAL_SHOWED_VALUE';

export const changeAddLineModalShowedValue = (isAddLineModalShowed: boolean) => {
    return {
        type: ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE,
        payload: isAddLineModalShowed
    }
};

export const changeEditPortalModalShowedValue = (isEditPortalModalShowed: boolean) => {
    return {
        type: ACTION_CHANGE_EDIT_PORTAL_SHOWED_VALUE,
        payload: isEditPortalModalShowed
    }
};

export const modalReducer = (state: ModalState = initialState, action: any): ModalState => {
    switch (action.type) {
        case ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE: {
            return {...state, isAddLineModalShowed: action.payload};
        }
        case ACTION_CHANGE_EDIT_PORTAL_SHOWED_VALUE: {
            return {...state, isEditPortalModalShowed: action.payload};
        }
        default: {
            return state;
        }
    }
};
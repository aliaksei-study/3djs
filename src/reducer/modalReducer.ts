import {ModalActionTypes} from "../types/ModalActionTypes";

export interface ModalState {
    isAddLineModalShowed: boolean,
    isAddPipeModalShowed: boolean
}

const initialState: ModalState = {
    isAddLineModalShowed: false,
    isAddPipeModalShowed: false
};

export const ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE = 'ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE';
export const ACTION_CHANGE_ADD_PIPE_MODAL_SHOWED_VALUE = 'ACTION_CHANGE_ADD_PIPE_MODAL_SHOWED_VALUE';

export const changeAddLineModalShowedValue = (isAddLineModalShowed: boolean) : ModalActionTypes => {
    return {
        type: ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE,
        payload: isAddLineModalShowed
    }
};

export const changeAddPipeShowedValue = (isAddPipeModalShowed: boolean) : ModalActionTypes => {
    return {
        type: ACTION_CHANGE_ADD_PIPE_MODAL_SHOWED_VALUE,
        payload: isAddPipeModalShowed
    }
};

export const modalReducer = (state: ModalState = initialState, action: ModalActionTypes): ModalState => {
    switch (action.type) {
        case ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE: {
            return {...state, isAddLineModalShowed: action.payload};
        }
        case ACTION_CHANGE_ADD_PIPE_MODAL_SHOWED_VALUE: {
            return {...state, isAddPipeModalShowed: action.payload};
        }
        default: {
            return state;
        }
    }
};
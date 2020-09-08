import {GenerateButtonActionTypes} from "../types/GenerateButtonActionTypes";

export interface GenerateButtonState {
    isPressed: boolean
}

const initialState = {
    isPressed: false
};

export const ACTION_PRESS_GENERATE_BUTTON = 'ACTION_PRESS_GENERATE_BUTTON';

export const pressGenerateButton = (newButtonState: boolean): GenerateButtonActionTypes => {
    return {
        type: ACTION_PRESS_GENERATE_BUTTON,
        payload: newButtonState
    }
};

export const generateButtonReducer = (state: GenerateButtonState = initialState, action: GenerateButtonActionTypes): GenerateButtonState => {
    switch (action.type) {
        case ACTION_PRESS_GENERATE_BUTTON: {
            return {...state, isPressed: action.payload}
        }
        default:
            return state;
    }
};
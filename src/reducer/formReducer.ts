import {FormActionTypes} from "../types/FormActionTypes";

export interface FormState {
    numberOfLayers: number | null;
    numberOfPortals: number | null;
    lengthOfModel: number | null,
    heightOfModel: number | null,
    widthOfModel: number | null,
}

const initialState: FormState = {
    numberOfLayers: 2,
    numberOfPortals: 2,
    lengthOfModel: 20,
    heightOfModel: 20,
    widthOfModel: 20,
};

export const ACTION_CHANGE_NUMBER_OF_LAYERS = 'ACTION_CHANGE_NUMBER_OF_LAYERS';
export const ACTION_CHANGE_NUMBER_OF_PORTALS = 'ACTION_CHANGE_NUMBER_OF_PORTALS';
export const ACTION_CHANGE_LENGTH_OF_MODEL = 'ACTION_CHANGE_LENGTH_OF_MODEL';
export const ACTION_CHANGE_HEIGHT_OF_MODEL = 'ACTION_CHANGE_HEIGHT_OF_MODEL';
export const ACTION_CHANGE_WIDTH_OF_MODEL = 'ACTION_CHANGE_WIDTH_OF_MODEL';
export const ACTION_GENERATE_PORTALS = 'ACTION_GENERATE_PORTALS';
export const ACTION_GENERATE_SECTIONS = 'ACTION_GENERATE_SECTIONS';

export const changeNumberOfLayers = (newNumberOfLayers: number): FormActionTypes => {
    return {
        type: ACTION_CHANGE_NUMBER_OF_LAYERS,
        payload: newNumberOfLayers
    }
};

export const changeNumberOfPortals = (newNumberOfPortals: number): FormActionTypes => {
    return {
        type: ACTION_CHANGE_NUMBER_OF_PORTALS,
        payload: newNumberOfPortals
    }
};

export const changeLengthOfModel = (newLengthOfModel: number): FormActionTypes => {
    return {
        type: ACTION_CHANGE_LENGTH_OF_MODEL,
        payload: newLengthOfModel
    }
};

export const changeHeightOfModel = (newHeightOfModel: number): FormActionTypes => {
    return {
        type: ACTION_CHANGE_HEIGHT_OF_MODEL,
        payload: newHeightOfModel
    }
};

export const changeWidthOfModel = (newWidthOfModel: number): FormActionTypes => {
    return {
        type: ACTION_CHANGE_WIDTH_OF_MODEL,
        payload: newWidthOfModel
    }
};

export const formReducer = (state: FormState = initialState, action: FormActionTypes): FormState => {
    switch (action.type) {
        case ACTION_CHANGE_NUMBER_OF_LAYERS: {
            return {...state, numberOfLayers: action.payload}
        }
        case ACTION_CHANGE_NUMBER_OF_PORTALS: {
            return {...state, numberOfPortals: action.payload}
        }
        case ACTION_CHANGE_LENGTH_OF_MODEL: {
            return {...state, lengthOfModel: action.payload}
        }
        case ACTION_CHANGE_HEIGHT_OF_MODEL: {
            return {...state, heightOfModel: action.payload}
        }
        case ACTION_CHANGE_WIDTH_OF_MODEL: {
            return {...state, widthOfModel: action.payload}
        }
        default:
            return state;
    }
};
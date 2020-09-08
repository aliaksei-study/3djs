import {
    ACTION_CHANGE_HEIGHT_OF_MODEL,
    ACTION_CHANGE_LENGTH_OF_MODEL,
    ACTION_CHANGE_NUMBER_OF_LAYERS,
    ACTION_CHANGE_NUMBER_OF_PORTALS, ACTION_CHANGE_WIDTH_OF_MODEL
} from "../reducer/formReducer";

export type ChangeNumberOfLayersType = {
    type: typeof ACTION_CHANGE_NUMBER_OF_LAYERS,
    payload: number
}

export type ChangeNumberOfPortalsType = {
    type: typeof ACTION_CHANGE_NUMBER_OF_PORTALS,
    payload:  number
}

export type ChangeLengthOfModelType = {
    type: typeof ACTION_CHANGE_LENGTH_OF_MODEL,
    payload: number
}

export type ChangeHeightOfModelType = {
    type: typeof ACTION_CHANGE_HEIGHT_OF_MODEL,
    payload: number
}

export type ChangeWidthOfModelType = {
    type: typeof ACTION_CHANGE_WIDTH_OF_MODEL,
    payload: number
}

export type FormActionTypes = ChangeNumberOfLayersType | ChangeNumberOfPortalsType | ChangeLengthOfModelType |
    ChangeHeightOfModelType | ChangeWidthOfModelType;
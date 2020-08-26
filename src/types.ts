import {
    ACTION_CHANGE_DIRECTION,
    ACTION_CHANGE_HEIGHT_OF_MODEL,
    ACTION_CHANGE_LENGTH_OF_MODEL,
    ACTION_CHANGE_NUMBER_OF_LAYERS,
    ACTION_CHANGE_NUMBER_OF_PORTALS, ACTION_CHANGE_WIDTH_OF_MODEL
} from "./formReducer";

export type ChangeNumberOfLayersType = {
    type: typeof ACTION_CHANGE_NUMBER_OF_LAYERS,
    payload: { newNumberOfLayers: number}
}

export type ChangeNumberOfPortalsType = {
    type: typeof ACTION_CHANGE_NUMBER_OF_PORTALS,
    payload:  {newNumberOfPortals: number}
}

export type ChangeLengthOfModelType = {
    type: typeof ACTION_CHANGE_LENGTH_OF_MODEL,
    payload: { newLengthOfModel: number}
}

export type ChangeHeightOfModelType = {
    type: typeof ACTION_CHANGE_HEIGHT_OF_MODEL,
    payload: { newHeightOfModel: number}
}

export type ChangeWidthOfModelType = {
    type: typeof ACTION_CHANGE_WIDTH_OF_MODEL,
    payload: { newWidthOfModel: number}
}

export type ChangeDirectionType = {
    type: typeof ACTION_CHANGE_DIRECTION,
    payload: { newDirection: string}
}
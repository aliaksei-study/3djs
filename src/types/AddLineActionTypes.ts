import {
    ACTION_SET_DIST_FROM_START,
    ACTION_SET_FIRST_LINE_ID,
    ACTION_SET_SECOND_LINE_ID
} from "../reducer/addLineReducer";

export type SetFirstLineIdType = {
    type: typeof ACTION_SET_FIRST_LINE_ID,
    payload: number
}

export type SetSecondLineIdType = {
    type: typeof ACTION_SET_SECOND_LINE_ID,
    payload: number
}

export type SetDistFromStart = {
    type: typeof ACTION_SET_DIST_FROM_START,
    payload: number
}

export type AddLineActionTypes = SetFirstLineIdType | SetSecondLineIdType | SetDistFromStart;
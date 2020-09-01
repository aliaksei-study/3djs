export interface AddLineState {
    firstLineId: number | null,
    secondLineId: number | null,
    distFromStart: number | null
}

const initialState: AddLineState = {
    firstLineId: null,
    secondLineId: null,
    distFromStart: null
};

export const ACTION_SET_FIRST_LINE_ID = 'ACTION_SET_FIRST_LINE_ID';
export const ACTION_SET_SECOND_LINE_ID = 'ACTION_SET_SECOND_LINE_ID';
export const ACTION_SET_DIST_FROM_START = 'ACTION_SET_DIST_FROM_START';

export const setFirstLineId = (firstLineId: number) => {
    return {
        type: ACTION_SET_FIRST_LINE_ID,
        payload: firstLineId
    }
};

export const setSecondLineId = (secondLineId: number) => {
    return {
        type: ACTION_SET_SECOND_LINE_ID,
        payload: secondLineId
    }
};

export const setDistFromStart = (distFromStart: number) => {
    return {
        type: ACTION_SET_DIST_FROM_START,
        payload: distFromStart
    }
};

export const addLineReducer = (state: AddLineState = initialState, action: any): AddLineState => {
    switch (action.type) {
        case ACTION_SET_FIRST_LINE_ID: {
            return {...state, firstLineId: action.payload}
        }
        case ACTION_SET_SECOND_LINE_ID: {
            return {...state, secondLineId: action.payload}
        }
        case ACTION_SET_DIST_FROM_START: {
            return {...state, distFromStart: action.payload}
        }
        default:
            return state;
    }
};

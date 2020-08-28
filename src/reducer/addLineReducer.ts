export interface AddLineState {
    firstLineId: number | null,
    secondLineId: number | null
}

const initialState: AddLineState = {
    firstLineId: null,
    secondLineId: null
};

export const ACTION_SET_FIRST_LINE_ID = 'ACTION_SET_FIRST_LINE_ID';
export const ACTION_SET_SECOND_LINE_ID = 'ACTION_SET_SECOND_LINE_ID';

export const setFirstLineId = (firstLineId: number | null) => {
    return {
        type: ACTION_SET_FIRST_LINE_ID,
        payload: firstLineId
    }
};

export const setSecondLineId = (secondLineId: number | null) => {
    return {
        type: ACTION_SET_SECOND_LINE_ID,
        payload: secondLineId
    }
};

export const addLineReducer = (state: AddLineState = initialState, action: any): AddLineState => {
    switch (action.type) {
        case ACTION_SET_FIRST_LINE_ID: {
            return {...state, firstLineId: action.payload}
        }
        case ACTION_SET_SECOND_LINE_ID: {
            return {...state, secondLineId:action.payload}
        }
        default:
            return state;
    }
};

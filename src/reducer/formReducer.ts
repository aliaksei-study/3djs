export interface FormState {
    numberOfLayers: number | null;
    numberOfPortals: number | null;
    lengthOfModel: number | null,
    heightOfModel: number | null,
    widthOfModel: number | null,
    direction: string | null
}

const initialState: FormState = {
    numberOfLayers: null,
    numberOfPortals: null,
    lengthOfModel: null,
    heightOfModel: null,
    widthOfModel: null,
    direction: null
};

export const ACTION_CHANGE_NUMBER_OF_LAYERS = 'ACTION_CHANGE_NUMBER_OF_LAYERS';
export const ACTION_CHANGE_NUMBER_OF_PORTALS = 'ACTION_CHANGE_NUMBER_OF_PORTALS';
export const ACTION_CHANGE_LENGTH_OF_MODEL = 'ACTION_CHANGE_LENGTH_OF_MODEL';
export const ACTION_CHANGE_HEIGHT_OF_MODEL = 'ACTION_CHANGE_HEIGHT_OF_MODEL';
export const ACTION_CHANGE_WIDTH_OF_MODEL = 'ACTION_CHANGE_WIDTH_OF_MODEL';
export const ACTION_CHANGE_DIRECTION = 'ACTION_CHANGE_DIRECTION';
export const ACTION_GENERATE_PORTALS = 'ACTION_GENERATE_PORTALS';
export const ACTION_GENERATE_SECTIONS = 'ACTION_GENERATE_SECTIONS';

export const changeNumberOfLayers = (newNumberOfLayers: number) => {
    return {
        type: ACTION_CHANGE_NUMBER_OF_LAYERS,
        payload: newNumberOfLayers
    }
};

export const changeNumberOfPortals = (newNumberOfPortals: number) => {
    return {
        type: ACTION_CHANGE_NUMBER_OF_PORTALS,
        payload: newNumberOfPortals
    }
};

export const changeLengthOfModel = (newLengthOfModel: number) => {
    return {
        type: ACTION_CHANGE_LENGTH_OF_MODEL,
        payload: newLengthOfModel
    }
};

export const changeHeightOfModel = (newHeightOfModel: number) => {
    return {
        type: ACTION_CHANGE_HEIGHT_OF_MODEL,
        payload: newHeightOfModel
    }
};

export const changeWidthOfModel = (newWidthOfModel: number) => {
    return {
        type: ACTION_CHANGE_WIDTH_OF_MODEL,
        payload: newWidthOfModel
    }
};

export const changeDirection = (newDirection: any) => {
    return {
        type: ACTION_CHANGE_DIRECTION,
        payload: newDirection
    }
};

export const formReducer = (state: FormState = initialState, action: any): FormState => {
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
        case ACTION_CHANGE_DIRECTION: {
            return {...state, direction: action.payload}
        }
        default:
            return state;
    }
};
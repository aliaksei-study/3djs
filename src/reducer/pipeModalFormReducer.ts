import {PipeModalFormActionTypes} from "../types/PipeModalFormActionTypes";

export interface PipeFormState {
    direction: string,
    firstBeamId: number | null,
    firstBeamCoordinateX: number | null,
    firstBeamCoordinateY: number | null,
    firstBeamCoordinateZ: number | null,
    secondBeamId: number | null,
    secondBeamCoordinateX: number | null,
    secondBeamCoordinateY: number | null,
    secondBeamCoordinateZ: number | null,
    outerDiameter: number | null,
    thickness: number | null,
    nextPipeId: number | null
}

const initialState: PipeFormState = {
    direction: "+x",
    firstBeamId: null,
    firstBeamCoordinateX: null,
    firstBeamCoordinateY: null,
    firstBeamCoordinateZ: null,
    secondBeamId: null,
    secondBeamCoordinateX: null,
    secondBeamCoordinateY: null,
    secondBeamCoordinateZ: null,
    outerDiameter: null,
    thickness: null,
    nextPipeId: null
};

export const ACTION_CHANGE_DIRECTION = 'ACTION_CHANGE_DIRECTION';
export const ACTION_CHANGE_FIRST_BEAM_ID = 'ACTION_CHANGE_FIRST_BEAM_ID';
export const ACTION_CHANGE_FIRST_BEAM_COORDINATE_X = 'ACTION_CHANGE_FIRST_BEAM_COORDINATE_X';
export const ACTION_CHANGE_FIRST_BEAM_COORDINATE_Y = 'ACTION_CHANGE_FIRST_BEAM_COORDINATE_Y';
export const ACTION_CHANGE_FIRST_BEAM_COORDINATE_Z = 'ACTION_CHANGE_FIRST_BEAM_COORDINATE_Z';
export const ACTION_CHANGE_SECOND_BEAM_ID = 'ACTION_CHANGE_SECOND_BEAM_ID';
export const ACTION_CHANGE_SECOND_BEAM_COORDINATE_X = 'ACTION_CHANGE_SECOND_BEAM_COORDINATE_X';
export const ACTION_CHANGE_SECOND_BEAM_COORDINATE_Y = 'ACTION_CHANGE_SECOND_BEAM_COORDINATE_Y';
export const ACTION_CHANGE_SECOND_BEAM_COORDINATE_Z = 'ACTION_CHANGE_SECOND_BEAM_COORDINATE_Z';
export const ACTION_CHANGE_OUTER_DIAMETER = 'ACTION_CHANGE_OUTER_DIAMETER';
export const ACTION_CHANGE_THICKNESS = 'ACTION_CHANGE_THICKNESS';
export const ACTION_CHANGE_NEXT_PIPE_ID = 'ACTION_CHANGE_NEXT_PIPE';

export const changeDirection = (direction: string): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_DIRECTION,
        payload: direction
    }
};

export const changeFirstBeamId = (firstBeamId: number): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_FIRST_BEAM_ID,
        payload: firstBeamId
    }
};

export const changeFirstBeamCoordinateX = (coordinateX: number): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_FIRST_BEAM_COORDINATE_X,
        payload: coordinateX
    }
};

export const changeFirstBeamCoordinateY = (coordinateY: number): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_FIRST_BEAM_COORDINATE_Y,
        payload: coordinateY
    }
};

export const changeFirstBeamCoordinateZ = (coordinateZ: number): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_FIRST_BEAM_COORDINATE_Z,
        payload: coordinateZ
    }
};

export const changeSecondBeamId = (secondBeamId: number): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_SECOND_BEAM_ID,
        payload: secondBeamId
    }
};

export const changeSecondBeamCoordinateX = (coordinateX: number): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_SECOND_BEAM_COORDINATE_X,
        payload: coordinateX
    }
};

export const changeSecondBeamCoordinateY = (coordinateY: number): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_SECOND_BEAM_COORDINATE_Y,
        payload: coordinateY
    }
};

export const changeSecondBeamCoordinateZ = (coordinateZ: number): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_SECOND_BEAM_COORDINATE_Z,
        payload: coordinateZ
    }
};

export const changeOuterDiameter = (outerDiameter: number): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_OUTER_DIAMETER,
        payload: outerDiameter
    }
};

export const changeThickness = (thickness: number): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_THICKNESS,
        payload: thickness
    }
};

export const changeNextPipeId = (nextPipeId: number): PipeModalFormActionTypes => {
    return {
        type: ACTION_CHANGE_NEXT_PIPE_ID,
        payload: nextPipeId
    }
};

export const pipeModalFormReducer = (state: PipeFormState = initialState, action: PipeModalFormActionTypes): PipeFormState => {
    switch(action.type) {
        case ACTION_CHANGE_DIRECTION: {
            return {...state, direction: action.payload}
        }
        case ACTION_CHANGE_FIRST_BEAM_ID: {
            return {...state, firstBeamId: action.payload}
        }
        case ACTION_CHANGE_FIRST_BEAM_COORDINATE_X: {
            return {...state, firstBeamCoordinateX: action.payload}
        }
        case ACTION_CHANGE_FIRST_BEAM_COORDINATE_Y: {
            return {...state, firstBeamCoordinateY: action.payload}
        }
        case ACTION_CHANGE_FIRST_BEAM_COORDINATE_Z: {
            return {...state, firstBeamCoordinateZ: action.payload}
        }
        case ACTION_CHANGE_SECOND_BEAM_ID: {
            return {...state, secondBeamId: action.payload}
        }
        case ACTION_CHANGE_SECOND_BEAM_COORDINATE_X: {
            return {...state, secondBeamCoordinateX: action.payload}
        }
        case ACTION_CHANGE_SECOND_BEAM_COORDINATE_Y: {
            return {...state, secondBeamCoordinateY: action.payload}
        }
        case ACTION_CHANGE_SECOND_BEAM_COORDINATE_Z: {
            return {...state, secondBeamCoordinateZ: action.payload}
        }
        case ACTION_CHANGE_OUTER_DIAMETER: {
            return {...state, outerDiameter: action.payload}
        }
        case ACTION_CHANGE_THICKNESS: {
            return {...state, thickness: action.payload}
        }
        case ACTION_CHANGE_NEXT_PIPE_ID: {
            return {...state, nextPipeId: action.payload}
        }
        default: {
            return state;
        }
    }
};







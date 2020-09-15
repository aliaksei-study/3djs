import {PipeActionTypes} from "../types/PipeActionTypes";

export type Pipe = {
    id:number,
    startBeam: Beam,
    endBeam: Beam,
    outerDiameter: number,
    thickness: number,
    next: Pipe | null
}

export type Beam = {
    lineId: number,
    coordinateX: number,
    coordinateY: number,
    coordinateZ: number
}

export interface PipeState {
    pipes: Array<Pipe>,
}

const initialState: PipeState = {
    pipes: [],
};

export const ACTION_ADD_NEW_PIPE = 'ACTION_ADD_NEW_PIPE';

export const addNewPipe = (newPipe: Pipe): PipeActionTypes  => {
    return {
        type: ACTION_ADD_NEW_PIPE,
        payload: newPipe
    }
};

export const pipeModalReducer = (state: PipeState = initialState, action: PipeActionTypes): PipeState => {
    switch(action.type) {
        case "ACTION_ADD_NEW_PIPE": {
            return {...state, pipes: [...state.pipes, action.payload]}
        }
        default: {
            return state;
        }
    }
};
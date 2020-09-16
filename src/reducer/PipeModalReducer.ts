import {PipeActionTypes} from "../types/PipeActionTypes";

export type Pipe = {
    id:number,
    direction: string,
    startBeam: Beam,
    endBeam: Beam,
    outerDiameter: number,
    thickness: number,
    nextPipeId: number | null
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
export const ACTION_DELETE_SELECTED_PIPES = 'ACTION_DELETE_SELECTED_PIPES';

export const addNewPipe = (newPipe: Pipe): PipeActionTypes  => {
    return {
        type: ACTION_ADD_NEW_PIPE,
        payload: newPipe
    }
};

export const deletePipes = (deletedPipes: Pipe[]): PipeActionTypes => {
    return {
        type: ACTION_DELETE_SELECTED_PIPES,
        payload: deletedPipes
    }
};

export const pipeModalReducer = (state: PipeState = initialState, action: PipeActionTypes): PipeState => {
    switch(action.type) {
        case ACTION_ADD_NEW_PIPE: {
            return {...state, pipes: [...state.pipes, action.payload]}
        }
        case ACTION_DELETE_SELECTED_PIPES: {
            return {...state, pipes: [...state.pipes.filter((pipe: Pipe) => !action.payload.includes(pipe))]}
        }
        default: {
            return state;
        }
    }
};
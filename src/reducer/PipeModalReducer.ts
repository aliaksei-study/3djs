import {
    ChangeBeamCoordinateXType,
    ChangeBeamCoordinateYType,
    ChangeBeamCoordinateZType, ChangeOuterDiameterType,
    PipeActionTypes
} from "../types/PipeActionTypes";
import {MapEntryType} from "../component/AddLineComponent";

export type Pipe = {
    id:number,
    direction: string,
    startBeam: Beam,
    endBeam: Beam,
    outerDiameter: number,
    thickness: number,
    nextPipeId: number | null,
    optionPipeMap: Array<MapEntryType>
}

export type Beam = {
    lineId: number,
    coordinateX: number,
    coordinateY: number,
    coordinateZ: number,
}

export interface PipeState {
    pipes: Array<Pipe>,
}

const initialState: PipeState = {
    pipes: [],
};

export const ACTION_ADD_NEW_PIPE = 'ACTION_ADD_NEW_PIPE';
export const ACTION_DELETE_SELECTED_PIPES = 'ACTION_DELETE_SELECTED_PIPES';
export const ACTION_CHANGE_BEAM_COORDINATE_X = 'ACTION_CHANGE_BEAM_COORDINATE_X';
export const ACTION_CHANGE_BEAM_COORDINATE_Y = 'ACTION_CHANGE_BEAM_COORDINATE_Y';
export const ACTION_CHANGE_BEAM_COORDINATE_Z = 'ACTION_CHANGE_BEAM_COORDINATE_Z';
export const ACTION_CHANGE_OUTER_DIAMETER = 'ACTION_CHANGE_OUTER_DIAMETER';
export const ACTION_CHANGE_THICKNESS = 'ACTION_CHANGE_THICKNESS';
export const ACTION_CHANGE_NEXT_PIPE_ID = 'ACTION_CHANGE_NEXT_PIPE_ID';
export const ACTION_CHANGE_BEAM_ID = 'ACTION_CHANGE_BEAM_ID';

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

export const changeBeamCoordinateX = (pipeId: number, beamId: number, coordinateX: number): PipeActionTypes => {
    return {
        type: ACTION_CHANGE_BEAM_COORDINATE_X,
        payload: {
            pipeId: pipeId,
            beamId: beamId,
            coordinate: coordinateX
        }
    }
};

export const changeBeamCoordinateY = (pipeId: number, beamId: number, coordinateY: number): PipeActionTypes => {
    return {
        type: ACTION_CHANGE_BEAM_COORDINATE_Y,
        payload: {
            pipeId: pipeId,
            beamId: beamId,
            coordinate: coordinateY
        }
    }
};

export const changeBeamCoordinateZ = (pipeId: number, beamId: number, coordinateZ: number): PipeActionTypes => {
    return {
        type: ACTION_CHANGE_BEAM_COORDINATE_Z,
        payload: {
            pipeId: pipeId,
            beamId: beamId,
            coordinate: coordinateZ
        }
    }
};

export const changeOuterDiameter = (pipeId: number, outerDiameter: number): PipeActionTypes => {
    return {
        type: ACTION_CHANGE_OUTER_DIAMETER,
        payload: {
            pipeId: pipeId,
            outerDiameter: outerDiameter
        }
    }
};

export const changeThickness = (pipeId: number, thickness: number): PipeActionTypes => {
    return {
        type: ACTION_CHANGE_THICKNESS,
        payload: {
            pipeId: pipeId,
            thickness: thickness
        }
    }
};

export const changeBeamId = (pipeId: number, newBeamId: number, isStartBeam: boolean): PipeActionTypes => {
    return {
        type: ACTION_CHANGE_BEAM_ID,
        payload: {
            pipeId: pipeId,
            newBeamId: newBeamId,
            isStartBeam: isStartBeam
        }
    }
};

export const changeNextPipeId = (pipeId: number, nextPipeId: number): PipeActionTypes => {
    return {
        type: ACTION_CHANGE_NEXT_PIPE_ID,
        payload: {
            pipeId: pipeId,
            nextPipeId: nextPipeId
        }
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
        case ACTION_CHANGE_BEAM_COORDINATE_X: {
            return {...state, pipes: updateBeamCoordinate(state, action)}
        }
        case ACTION_CHANGE_BEAM_COORDINATE_Y: {
            return {...state, pipes: updateBeamCoordinate(state, action)}
        }
        case ACTION_CHANGE_BEAM_COORDINATE_Z: {
            return {...state, pipes: updateBeamCoordinate(state, action)}
        }
        case ACTION_CHANGE_OUTER_DIAMETER: {
            let newPipeArray: Array<Pipe> = Array.from(state.pipes);
            let changedPipe = newPipeArray.find(pipe => pipe.id === action.payload.pipeId);
            if(changedPipe !== undefined) {
                changedPipe.outerDiameter = action.payload.outerDiameter;
            }
            return {...state, pipes: newPipeArray}
        }
        case ACTION_CHANGE_THICKNESS: {
            let newPipeArray: Array<Pipe> = Array.from(state.pipes);
            let changedPipe = newPipeArray.find(pipe => pipe.id === action.payload.pipeId);
            if(changedPipe !== undefined) {
                changedPipe.thickness = action.payload.thickness;
            }
            return {...state, pipes: newPipeArray}
        }
        case ACTION_CHANGE_NEXT_PIPE_ID: {
            let newPipeArray: Array<Pipe> = Array.from(state.pipes);
            let changedPipe = newPipeArray.find(pipe => pipe.id === action.payload.pipeId);
            if(changedPipe !== undefined) {
                changedPipe.nextPipeId = action.payload.nextPipeId;
            }
            return {...state, pipes: newPipeArray}
        }
        case ACTION_CHANGE_BEAM_ID: {
            let newPipeArray: Array<Pipe> = Array.from(state.pipes);
            let changedPipe = newPipeArray.find(pipe => pipe.id === action.payload.pipeId);
            if(changedPipe !== undefined) {
                if(action.payload.isStartBeam) {
                    changedPipe.startBeam.lineId = action.payload.newBeamId;
                } else {
                    changedPipe.endBeam.lineId = action.payload.newBeamId
                }
            }
            return {...state, pipes: newPipeArray}
        }
        default: {
            return state;
        }
    }
};

function updateBeamCoordinate(state: PipeState, action: ChangeBeamCoordinateXType | ChangeBeamCoordinateYType | ChangeBeamCoordinateZType): Array<Pipe> {
    let newPipeArray: Array<Pipe> = Array.from(state.pipes);
    let changedPipe = newPipeArray.find(pipe => pipe.id === action.payload.pipeId);
    let changedBeam: Beam;
    if(changedPipe !== undefined) {
        changedBeam = changedPipe.startBeam.lineId === action.payload.beamId ? changedPipe.startBeam : changedPipe.endBeam;
        switch(action.type) {
            case ACTION_CHANGE_BEAM_COORDINATE_X: {
                changedBeam.coordinateX = action.payload.coordinate;
                break;
            }
            case ACTION_CHANGE_BEAM_COORDINATE_Y: {
                changedBeam.coordinateY = action.payload.coordinate;
                break;
            }
            case ACTION_CHANGE_BEAM_COORDINATE_Z: {
                changedBeam.coordinateZ = action.payload.coordinate;
                break;
            }
        }
    }
    return newPipeArray;
}
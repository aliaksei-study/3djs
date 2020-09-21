import {
    ACTION_ADD_NEW_PIPE,
    ACTION_CHANGE_BEAM_COORDINATE_X,
    ACTION_CHANGE_BEAM_COORDINATE_Y,
    ACTION_CHANGE_BEAM_COORDINATE_Z, ACTION_CHANGE_NEXT_PIPE_ID,
    ACTION_CHANGE_OUTER_DIAMETER, ACTION_CHANGE_THICKNESS,
    ACTION_DELETE_SELECTED_PIPES,
    Pipe
} from "../reducer/PipeModalReducer";


export type AddNewPipeType = {
    type: typeof ACTION_ADD_NEW_PIPE,
    payload: Pipe
}

export type DeleteSelectedPipesType = {
    type: typeof ACTION_DELETE_SELECTED_PIPES,
    payload: Pipe[]
}

export type ChangeBeamCoordinateXType = {
    type: typeof ACTION_CHANGE_BEAM_COORDINATE_X,
    payload: {
        pipeId: number,
        beamId: number,
        coordinate: number
    }
}

export type ChangeBeamCoordinateYType = {
    type: typeof ACTION_CHANGE_BEAM_COORDINATE_Y,
    payload: {
        pipeId: number,
        beamId: number,
        coordinate: number
    }
}

export type ChangeBeamCoordinateZType = {
    type: typeof ACTION_CHANGE_BEAM_COORDINATE_Z,
    payload: {
        pipeId: number,
        beamId: number,
        coordinate: number
    }
}

export type ChangeOuterDiameterType = {
    type: typeof ACTION_CHANGE_OUTER_DIAMETER,
    payload: {
        pipeId: number,
        outerDiameter: number
    }
}

export type ChangeThicknessType = {
    type: typeof ACTION_CHANGE_THICKNESS,
    payload: {
        pipeId: number,
        thickness: number
    }
}

export type ChangeNextPipeIdType = {
    type: typeof ACTION_CHANGE_NEXT_PIPE_ID,
    payload: {
        pipeId: number,
        nextPipeId: number
    }
}

export type PipeActionTypes = AddNewPipeType | DeleteSelectedPipesType | ChangeBeamCoordinateXType | ChangeBeamCoordinateYType |
    ChangeBeamCoordinateZType | ChangeOuterDiameterType | ChangeThicknessType | ChangeNextPipeIdType;
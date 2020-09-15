import {
    ACTION_CHANGE_DIRECTION,
    ACTION_CHANGE_FIRST_BEAM_COORDINATE_X,
    ACTION_CHANGE_FIRST_BEAM_COORDINATE_Y,
    ACTION_CHANGE_FIRST_BEAM_COORDINATE_Z,
    ACTION_CHANGE_FIRST_BEAM_ID, ACTION_CHANGE_NEXT_PIPE_ID, ACTION_CHANGE_OUTER_DIAMETER,
    ACTION_CHANGE_SECOND_BEAM_COORDINATE_X,
    ACTION_CHANGE_SECOND_BEAM_COORDINATE_Y, ACTION_CHANGE_SECOND_BEAM_COORDINATE_Z,
    ACTION_CHANGE_SECOND_BEAM_ID, ACTION_CHANGE_THICKNESS
} from "../reducer/pipeModalFormReducer";

export type ChangeDirectionType = {
    type: typeof ACTION_CHANGE_DIRECTION,
    payload: string
}

export type ChangeFirstBeamIdType = {
    type: typeof ACTION_CHANGE_FIRST_BEAM_ID,
    payload: number
}

export type ChangeFirstBeamCoordinateXType = {
    type: typeof ACTION_CHANGE_FIRST_BEAM_COORDINATE_X,
    payload: number
}

export type ChangeFirstBeamCoordinateYType = {
    type: typeof ACTION_CHANGE_FIRST_BEAM_COORDINATE_Y,
    payload: number
}

export type ChangeFirstBeamCoordinateZType = {
    type: typeof ACTION_CHANGE_FIRST_BEAM_COORDINATE_Z,
    payload: number
}

export type ChangeSecondBeamIdType = {
    type: typeof ACTION_CHANGE_SECOND_BEAM_ID,
    payload: number
}

export type ChangeSecondBeamCoordinateXType = {
    type: typeof ACTION_CHANGE_SECOND_BEAM_COORDINATE_X,
    payload: number
}

export type ChangeSecondBeamCoordinateYType = {
    type: typeof ACTION_CHANGE_SECOND_BEAM_COORDINATE_Y,
    payload: number
}

export type ChangeSecondBeamCoordinateZType = {
    type: typeof ACTION_CHANGE_SECOND_BEAM_COORDINATE_Z,
    payload: number
}

export type ChangeOuterDiameterType = {
    type: typeof ACTION_CHANGE_OUTER_DIAMETER,
    payload: number
}

export type ChangeThicknessType = {
    type: typeof ACTION_CHANGE_THICKNESS,
    payload: number
}

export type ChangeNextPipeIdType = {
    type: typeof ACTION_CHANGE_NEXT_PIPE_ID,
    payload: number
}

export type PipeModalFormActionTypes = ChangeDirectionType | ChangeFirstBeamCoordinateXType | ChangeFirstBeamCoordinateYType |
    ChangeFirstBeamCoordinateZType | ChangeFirstBeamIdType | ChangeSecondBeamIdType | ChangeSecondBeamCoordinateXType |
    ChangeSecondBeamCoordinateYType | ChangeSecondBeamCoordinateZType | ChangeOuterDiameterType | ChangeThicknessType |
    ChangeNextPipeIdType;
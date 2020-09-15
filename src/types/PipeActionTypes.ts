import {ACTION_ADD_NEW_PIPE, Pipe} from "../reducer/PipeModalReducer";


export type AddNewPipeType = {
    type: typeof ACTION_ADD_NEW_PIPE,
    payload: Pipe
}

export type PipeActionTypes = AddNewPipeType;
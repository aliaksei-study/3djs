import {ACTION_ADD_NEW_PIPE, ACTION_DELETE_SELECTED_PIPES, Pipe} from "../reducer/PipeModalReducer";


export type AddNewPipeType = {
    type: typeof ACTION_ADD_NEW_PIPE,
    payload: Pipe
}

export type DeleteSelectedPipesType = {
    type: typeof ACTION_DELETE_SELECTED_PIPES,
    payload: Pipe[]
}

export type PipeActionTypes = AddNewPipeType | DeleteSelectedPipesType;
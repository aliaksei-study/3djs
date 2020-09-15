import {
    ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE,
    ACTION_CHANGE_ADD_PIPE_MODAL_SHOWED_VALUE
} from "../reducer/modalReducer";

export type ChangeAddLineModalShowedValueType = {
    type: typeof ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE,
    payload: boolean
}

export type ChangeAddPipeModalShowedValueType = {
    type: typeof ACTION_CHANGE_ADD_PIPE_MODAL_SHOWED_VALUE,
    payload: boolean
}

export type ModalActionTypes = ChangeAddLineModalShowedValueType | ChangeAddPipeModalShowedValueType;
import {ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE} from "../reducer/modalReducer";

export type ChangeAddLineModalShowedValueType = {
    type: typeof ACTION_CHANGE_ADD_LINE_PORTAL_SHOWED_VALUE,
    payload: boolean
}

export type ModalActionTypes = ChangeAddLineModalShowedValueType;
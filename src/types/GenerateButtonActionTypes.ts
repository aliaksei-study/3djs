import {ACTION_PRESS_GENERATE_BUTTON} from "../reducer/generateButtonReducer";

export type PressGenerateButtonType = {
    type: typeof ACTION_PRESS_GENERATE_BUTTON,
    payload: boolean
}

export type GenerateButtonActionTypes = PressGenerateButtonType;
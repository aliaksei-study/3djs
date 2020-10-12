import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tableReducer, TableState} from "../reducer/tableReducer";
import {generateButtonReducer, GenerateButtonState} from "../reducer/generateButtonReducer";
import {modalReducer, ModalState} from "../reducer/modalReducer";
import {pipeModalReducer, PipeState} from "../reducer/PipeModalReducer";
import {PipeFormState, pipeModalFormReducer} from "../reducer/pipeModalFormReducer";
import thunkMiddleware from 'redux-thunk'
import {formModelReducer, FormState} from "../reducer/formReducer";


export const rootReducer = combineReducers({
    modelForm: formModelReducer,
    table: tableReducer,
    generateButton: generateButtonReducer,
    modal: modalReducer,
    pipeModal: pipeModalReducer,
    pipeModalForm: pipeModalFormReducer
});

export interface RootState {
    modelForm: FormState
    table: TableState,
    generateButton: GenerateButtonState,
    modal: ModalState,
    pipeModal: PipeState
    pipeModalForm: PipeFormState
}

type PropertiesType<T> = T extends {[key: string]: infer U} ? U: never;

export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
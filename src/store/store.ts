import {applyMiddleware, combineReducers, createStore} from 'redux';
import {formReducer, FormState} from "../reducer/formReducer";
import {tableReducer, TableState} from "../reducer/tableReducer";
import {generateButtonReducer, GenerateButtonState} from "../reducer/generateButtonReducer";
import {addLineReducer, AddLineState} from "../reducer/addLineReducer";
import {modalReducer, ModalState} from "../reducer/modalReducer";
import {pipeModalReducer, PipeState} from "../reducer/PipeModalReducer";
import {PipeFormState, pipeModalFormReducer} from "../reducer/pipeModalFormReducer";
import thunkMiddleware from 'redux-thunk'

export const rootReducer = combineReducers({
    form: formReducer,
    table: tableReducer,
    generateButton: generateButtonReducer,
    addLine: addLineReducer,
    modal: modalReducer,
    pipeModal: pipeModalReducer,
    pipeModalForm: pipeModalFormReducer
});

export interface RootState {
    form: FormState,
    table: TableState,
    generateButton: GenerateButtonState,
    addLine: AddLineState,
    modal: ModalState,
    pipeModal: PipeState
    pipeModalForm: PipeFormState
}

type PropertiesType<T> = T extends {[key: string]: infer U} ? U: never;

export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
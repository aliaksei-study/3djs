import {combineReducers, createStore} from 'redux';
import {formReducer, FormState} from "../reducer/formReducer";
import {tableReducer, TableState} from "../reducer/tableReducer";
import {generateButtonReducer, GenerateButtonState} from "../reducer/generateButtonReducer";

export const rootReducer = combineReducers({
    form: formReducer,
    table: tableReducer,
    generateButton: generateButtonReducer
});

export interface RootState {
    form: FormState,
    table: TableState,
    generateButton: GenerateButtonState
}

export const store = createStore(rootReducer);
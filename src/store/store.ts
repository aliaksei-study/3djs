import {combineReducers, createStore} from 'redux';
import {formReducer, FormState} from "../reducer/formReducer";
import {tableReducer, TableState} from "../reducer/tableReducer";
import {generateButtonReducer, GenerateButtonState} from "../reducer/generateButtonReducer";
import {editPortalReducer, EditPortalState} from "../reducer/editPortalReducer";
import {addLineReducer, AddLineState} from "../reducer/addLineReducer";
import {modalReducer, ModalState} from "../reducer/modalReducer";

export const rootReducer = combineReducers({
    form: formReducer,
    table: tableReducer,
    generateButton: generateButtonReducer,
    editPortal: editPortalReducer,
    addLine: addLineReducer,
    modal: modalReducer
});

export interface RootState {
    form: FormState,
    table: TableState,
    generateButton: GenerateButtonState,
    editPortal: EditPortalState,
    addLine: AddLineState,
    modal: ModalState
}

export const store = createStore(rootReducer);
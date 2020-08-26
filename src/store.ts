import {createStore} from 'redux';
import {formReducer} from "./formReducer";

export const store = createStore(formReducer);
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'
import {Provider} from 'react-redux';
import {store} from "./store/store";
import FormComponent from "./component/FormComponent";
import TableComponent from "./component/TableComponent";
import PipeTableComponent from "./component/PipeTableComponent";
import GraphicsComponent from "./component/GraphicsComponent";
import {FormState} from "./reducer/formReducer";

ReactDOM.render(
  <Provider store = {store}>
    <FormComponent />
    <TableComponent />
    <PipeTableComponent/>
    <GraphicsComponent/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

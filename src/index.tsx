import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'
import {Provider} from 'react-redux';
import {store} from "./store/store";
import FormComponent from "./component/FormComponent";

ReactDOM.render(
  <Provider store = {store}>
    <FormComponent />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

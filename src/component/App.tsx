import React, {Component} from 'react';
import FormComponent from "./FormComponent";
import TableComponent from "./TableComponent";
import GraphicsComponent from "./GraphicsComponent";
import {store} from "../store";

class App extends Component {
    render() {
        return (
            <div>
                <FormComponent />
                <TableComponent />
                <GraphicsComponent />
            </div>
        )
    }
}

export default App;

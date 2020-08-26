import React from 'react';
import {useStore} from 'react-redux';
import {
    changeDirection,
    changeHeightOfModel,
    changeLengthOfModel,
    changeNumberOfLayers,
    changeNumberOfPortals,
    changeWidthOfModel,
    FormState
} from "../formReducer";


function FormComponent() {
    const store = useStore<FormState, any>();
    return (
        <form className="mt-3 ml-5 mr-5">
            <div className="form-row mt-3">
                <div className="col">
                    <input
                        type="number"
                        className="form-control"
                        id="layersInput"
                        placeholder="Number of layers"
                        onChange={(event) => {
                            store.dispatch(changeNumberOfLayers(+event.target.value));
                        }}
                    />
                </div>
                <div className="col">
                    <input
                        type="number"
                        className="form-control"
                        id="portalsInput"
                        placeholder="Number of portals"
                        onChange={(event) => {
                            store.dispatch(changeNumberOfPortals(+event.target.value));
                        }}
                    />
                </div>
            </div>
            <div className="form-row mt-3">
                <div className="col">
                    <input
                        type="number"
                        className="form-control"
                        id="lengthInput"
                        placeholder="Length of model"
                        onChange={(event) => {
                            store.dispatch(changeLengthOfModel(+event.target.value));
                        }}
                    />
                </div>
                <div className="col">
                    <input
                        type="number"
                        className="form-control"
                        id="heightInput"
                        placeholder="Height of model"
                        onChange={(event) => {
                            store.dispatch(changeHeightOfModel(+event.target.value));
                        }}
                    />
                </div>
            </div>
            <div className="form-row mt-3">
                <div className="col">
                    <input
                        type="number"
                        className="form-control"
                        id="widthInput"
                        placeholder="Width of model"
                        onChange={(event) => {
                            store.dispatch(changeWidthOfModel(+event.target.value));
                        }}
                    />
                </div>
                <div className="col">
                    <select
                        id="inputDirection"
                        defaultValue={"+X"}
                        className="form-control"
                        onChange={(event) => {
                            store.dispatch(changeDirection(event.target.value));
                        }}
                    >
                        <option>+X</option>
                        <option>-X</option>
                        <option>+Z</option>
                        <option>-Z</option>
                    </select>
                </div>
            </div>
        </form>
    )

}

export default FormComponent;
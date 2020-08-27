import React from 'react';
import {useSelector, useStore} from 'react-redux';
import {
    changeDirection,
    changeHeightOfModel,
    changeLengthOfModel,
    changeNumberOfLayers,
    changeNumberOfPortals,
    changeWidthOfModel,
} from "../reducer/formReducer";
import {generatePortals, generateSections, Portal, Section} from "../reducer/tableReducer";
import {generatePortal} from "../service/PortalService";
import {generateSection} from "../service/SectionService";
import {pressGenerateButton} from "../reducer/generateButtonReducer";
import GraphicsComponent from "./GraphicsComponent";
import TableComponent from "./TableComponent";
import {RootState} from "../store/store";


function FormComponent() {
    const store = useStore<RootState, any>();
    const generateButton = useSelector((state: RootState) => state.generateButton.isPressed);
    return (
        <div>
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
                <button type="button"
                        className="btn btn-outline-success mt-3 mx-auto d-block"
                        onClick={(event) => {
                            let portals: Portal[] = [];
                            let sections: Section[] = [];
                            let formState = store.getState().form;
                            let distFromStart = 0;
                            let step = formState.lengthOfModel == null ? 0 : formState.lengthOfModel /
                                (formState.numberOfPortals == null ? 0 : formState.numberOfPortals - 1);
                            for (let j = 0; j < (formState.numberOfPortals === null ? 0 : formState.numberOfPortals); j++) {
                                // @ts-ignore
                                portals.push(generatePortal(step, distFromStart, formState.heightOfModel, formState.widthOfModel));
                                distFromStart += step;
                            }
                            store.dispatch(generatePortals(portals));
                            let tableState = store.getState().table;
                            // @ts-ignore
                            let stepLayer = formState.heightOfModel / formState.numberOfLayers;
                            for (let j = 0; j < (formState.numberOfPortals === null ? 0 : formState.numberOfPortals - 1); j++) {
                                for (let i = 0; i < (formState.numberOfLayers === null ? 0 : formState.numberOfLayers); i++) {
                                    sections.push(generateSection(i, stepLayer, tableState.portals[j], tableState.portals[j + 1],
                                        formState.lengthOfModel === null ? 0 : formState.lengthOfModel,
                                        formState.widthOfModel === null ? 0 : formState.widthOfModel));
                                }
                            }
                            store.dispatch(generateSections(sections));
                            store.dispatch(pressGenerateButton(true));
                        }
                        }>Generate
                </button>
            </form>
            {generateButton && <TableComponent/>}
            {generateButton && <GraphicsComponent/>}
        </div>
    )
}

export default FormComponent;
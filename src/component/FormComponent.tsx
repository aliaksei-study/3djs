import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {
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
import PipeTableComponent from "./PipeTableComponent";
import {RootState} from "../store/store";
import {FormGroup, InputGroup} from "@blueprintjs/core";

function FormComponent() {
    const store = useStore<RootState, any>();
    const generateButton = useSelector((state: RootState) => state.generateButton.isPressed);
    const numberOfPortals = useSelector((state:RootState) => state.form.numberOfPortals);
    const heightOfModel = useSelector((state:RootState) => state.form.heightOfModel);
    const numberOfLayers = useSelector((state:RootState) => state.form.numberOfLayers);
    const widthOfModel = useSelector((state:RootState) => state.form.widthOfModel);
    const lengthOfModel = useSelector((state: RootState) => state.form.lengthOfModel);
    const dispatch = useDispatch();

    function generateModel() {
        let portals: Portal[] = [];
        let sections: Section[] = [];
        let distFromStart = 0;
        if(lengthOfModel !== null && numberOfPortals !== null && heightOfModel !== null &&
            numberOfLayers !== null && widthOfModel !== null) {
            let step = lengthOfModel / (numberOfPortals - 1);
            let stepLayer = heightOfModel / numberOfLayers;
            for (let j = 0; j < numberOfPortals; j++) {
                portals.push(generatePortal(step, distFromStart, heightOfModel, widthOfModel, numberOfLayers));
                distFromStart += step;
            }
            dispatch(generatePortals(portals));
            let tableState = store.getState().table;
            for (let j = 0; j < numberOfPortals - 1; j++) {
                for (let i = 0; i < numberOfLayers; i++) {
                    sections.push(generateSection(stepLayer, tableState.portals[j], tableState.portals[j + 1], widthOfModel));
                    stepLayer += stepLayer;
                }
            }
        }
        dispatch(generateSections(sections));
        dispatch(pressGenerateButton(true));
    }

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
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeNumberOfLayers(+event.target.value));
                            }}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            id="portalsInput"
                            placeholder="Number of portals"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeNumberOfPortals(+event.target.value));
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
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeLengthOfModel(+event.target.value));
                            }}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            id="heightInput"
                            placeholder="Height of model"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeHeightOfModel(+event.target.value));
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
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeWidthOfModel(+event.target.value));
                            }}
                        />
                    </div>
                </div>
                <div className="form-col">
                    <FormGroup>
                        <InputGroup type="number" placeholder="NumberOfLayers"/>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup type="number" placeholder="NumberOfLayers"/>
                    </FormGroup>
                </div>
                <button type="button"
                        className="btn btn-outline-success mt-3 mx-auto d-block"
                        onClick={(event) => {
                            generateModel();
                        }
                        }>Generate
                </button>
            </form>
            {generateButton && <TableComponent/>}
            {generateButton && <PipeTableComponent/>}
            {generateButton && <GraphicsComponent/>}
        </div>
    )
}

export default FormComponent;
import React from 'react';
import {useSelector, useStore} from "react-redux";
import {FormState} from "../reducer/formReducer";
import {generatePortal} from "../service/PortalService";
import {addPortal, addSection, removeLine, TableState} from "../reducer/tableReducer";
import {GenerateButtonState} from "../reducer/generateButtonReducer";
import {generateSection} from "../service/SectionService";
import {RootState} from "../store/store";

function TableComponent() {
    const store = useStore<RootState, any>();
    let formState = store.getState().form;
    let tableState = store.getState().table;
    const portals = useSelector((state: RootState) => state.table.portals);
    let portalNumber = 1;
    return (
        <div className="container">
            <button type="button"
                    className="btn btn-outline-success"
                    onClick={(event) => {
                        let state = store.getState();
                        let generatedPortal;
                        let stepLayer = (formState.heightOfModel === null ? 0 : formState.heightOfModel) /
                            (formState.numberOfLayers === null ? 0 : formState.numberOfLayers);
                        let portal = Array.from(tableState.portals).pop();
                        if (portal !== undefined && formState.heightOfModel !== null) {
                            generatedPortal = generatePortal(portal.step, portal.distFromStart + portal.step, formState.heightOfModel, portal.portalWidth);
                            store.dispatch(addPortal(generatedPortal));
                        }
                        for (let numberOfSection = 0; numberOfSection < (formState.numberOfLayers === null ? 0 : formState.numberOfLayers);
                             numberOfSection++) {
                            let generatedSection;
                            if (generatedPortal !== undefined && portal !== undefined) {
                                generatedSection = generateSection(numberOfSection, stepLayer, generatedPortal, portal,
                                    formState.heightOfModel === null ? 0 : formState.heightOfModel,
                                    formState.widthOfModel === null ? 0 : formState.widthOfModel);
                            }
                            if(generatedSection !== undefined) {
                                store.dispatch(addSection(generatedSection));
                            }
                        }
                    }}
            >Add
            </button>
            <button type="button" className=" ml-3 btn btn-outline-success" onClick={(event) => {
                let x = document.getElementById("addLine");
                if (x !== null) {
                    x.hidden = !x.hidden;
                }
            }}>Add Line
            </button>
            <div id="addLine" hidden>
                <select className="form-control">
                    <option>Choose firstLine</option>
                </select>
                <select className="form-control">
                    <option>Default select</option>
                </select>
            </div>
            <div id="editModel" hidden>
                <input type="number" className="form-control" id="newNumberOfSections"
                       placeholder="new number of sections"/>
                <input type="number" className="form-control" id="newWidthOfPortal" placeholder="new width of portal"/>
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Portal</th>
                    <th>Distance from start</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Number of Layers</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {portals.map(portal => (
                    <tr>
                        <td>{portalNumber++}</td>
                        <td>{portal.distFromStart}</td>
                        <td>{portal.portalWidth}</td>
                        <td>{store.getState().form.heightOfModel}</td>
                        <td>{store.getState().form.numberOfLayers}</td>
                        <td>
                            <button onClick={(event) => {
                                let x = document.getElementById("editModel");
                                let numberOfLayers = document.getElementById("newNumberOfSections");
                                let widthOfPortal = document.getElementById("newWidthOfPortal");
                                if (x !== null) {
                                    x.hidden = !x.hidden;
                                }
                                if (numberOfLayers !== null) {
                                    numberOfLayers.addEventListener("change", (event: Event) => {
                                    }, false)
                                }
                                if (widthOfPortal !== null) {
                                    widthOfPortal.addEventListener("change", (event) => {
                                    })
                                }
                            }}>Edit
                            </button>
                            <button
                                onClick={(event) => {
                                    let removedLineId = portal.id;
                                    store.dispatch(removeLine(removedLineId));
                                }}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent;
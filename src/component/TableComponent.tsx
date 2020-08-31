import React from 'react';
import {useSelector, useStore} from "react-redux";
import {generatePortal} from "../service/PortalService";
import {addPortal, addSection, removeLine} from "../reducer/tableReducer";
import {generateSection} from "../service/SectionService";
import {RootState} from "../store/store";
import EditPortalComponent from "./EditPortalComponent";
import {setPortalId} from "../reducer/editPortalReducer";
import {
    changeAddLineModalShowedValue,
    changeEditPortalModalShowedValue,
} from "../reducer/modalReducer";
import AddLineComponent from "./AddLineComponent";

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
                        let generatedPortal;
                        let stepLayer = (formState.heightOfModel === null ? 0 : formState.heightOfModel) /
                            (formState.numberOfLayers === null ? 0 : formState.numberOfLayers);
                        let portal = Array.from(tableState.portals).pop();
                        if (portal !== undefined && formState.heightOfModel !== null && formState.widthOfModel !== null
                            && formState.numberOfPortals !== null) {
                            generatedPortal = generatePortal(portal.step, portal.distFromStart + portal.step,
                                formState.heightOfModel, formState.widthOfModel, formState.numberOfPortals);
                            store.dispatch(addPortal(generatedPortal));
                        }
                        for (let numberOfSection = 0; numberOfSection < (formState.numberOfLayers === null ? 0 : formState.numberOfLayers);
                             numberOfSection++) {
                            let generatedSection;
                            if (generatedPortal !== undefined && portal !== undefined) {
                                generatedSection = generateSection(stepLayer, generatedPortal, portal,
                                    formState.widthOfModel === null ? 0 : formState.widthOfModel);
                            }
                            if (generatedSection !== undefined) {
                                stepLayer += stepLayer;
                                store.dispatch(addSection(generatedSection));
                            }
                        }
                    }}
            >Add
            </button>
            <button type="button" className=" ml-3 btn btn-outline-success" onClick={(event) => {
                store.dispatch(changeAddLineModalShowedValue(true));
            }}>Add Line
            </button>
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
                        <td>{store.getState().form.widthOfModel}</td>
                        <td>{portal.heightOfPortal}</td>
                        <td>{portal.numberOfPortalLayers}</td>
                        <td>
                            <button onClick={(event) => {
                                store.dispatch(setPortalId(portal.id));
                                store.dispatch(changeEditPortalModalShowedValue(true));
                            }}>Edit
                            </button>
                            {portalNumber !== 1 && <button
                                onClick={(event) => {
                                    let removedLineId = portal.id;
                                    store.dispatch(removeLine(removedLineId));
                                }}>Delete
                            </button>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <EditPortalComponent/>
            <AddLineComponent/>
        </div>
    )
}

export default TableComponent;
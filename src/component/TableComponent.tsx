import React from 'react';
import {useSelector, useStore} from "react-redux";
import {generatePortal} from "../service/PortalService";
import {addPortal, addSection, removeLine, removeModel, removeRandomLine, removeSection} from "../reducer/tableReducer";
import {generateSection} from "../service/SectionService";
import {RootState} from "../store/store";
import EditPortalComponent from "./EditPortalComponent";
import {changeClickedValue, setPortalId} from "../reducer/editPortalReducer";
import {
    changeAddLineModalShowedValue,
    changeEditPortalModalShowedValue,
} from "../reducer/modalReducer";
import AddLineComponent from "./AddLineComponent";
import SplitModelComponent from "./SplitModelComponent";
import InputCellComponent from "./InputCellComponent";

/*
* InputCell = () => {
*
* return <td>...</td>
* }
* */

function TableComponent() {
    const store = useStore<RootState, any>();
    let formState = store.getState().form;
    let tableState = store.getState().table;
    const portals = useSelector((state: RootState) => state.table.portals);
    const sections = useSelector((state: RootState) => state.table.sections);
    const isClicked = useSelector((state: RootState) => state.editPortal.isClicked);
    const randomLines = useSelector((state: RootState) => state.table.lines);
    let portalNumber = 0;
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
            <SplitModelComponent/>
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
                    <tr key={portalNumber}>
                        <td>{++portalNumber}</td>
                        <InputCellComponent value={portal.distFromStart}/>
                        <td>{store.getState().form.widthOfModel}</td>
                        <InputCellComponent value={portal.heightOfPortal}/>
                        <InputCellComponent value={portal.numberOfPortalLayers}/>
                        <td>
                            <button onClick={(event) => {
                                store.dispatch(setPortalId(portal.id));
                                store.dispatch(changeEditPortalModalShowedValue(true));
                            }}>Edit
                            </button>
                            <button
                                onClick={(event) => {
                                    let removedLineId = portal.id;
                                    if (removedLineId === portals[0].id) {
                                        store.dispatch(removeModel());
                                    } else {
                                        portal.portalLines.forEach(line => randomLines.forEach(randomLine => {
                                            if (randomLine.firstLineId === line.id) {
                                                store.dispatch(removeRandomLine(randomLine.firstLineId));
                                            } else if (randomLine.secondLineId === line.id) {
                                                store.dispatch(removeRandomLine(randomLine.secondLineId));
                                            }
                                        }));
                                        if(removedLineId === portals[portals.length - 1].id) {
                                            sections.forEach(section => {
                                                if(section.firstPortalId === removedLineId || section.secondPortalId === removedLineId) {
                                                    store.dispatch(removeSection(section.id));
                                                }
                                            })
                                        }
                                    }
                                    store.dispatch(removeLine(removedLineId));
                                }
                                }
                            >Delete
                            </button>
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
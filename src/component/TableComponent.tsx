import React from 'react';
import {useSelector, useStore} from "react-redux";
import {generatePortal, regeneratePortal} from "../service/PortalService";
import {
    addPortal,
    addSection,
    generatePortals, generateSections,
    removeLine,
    removeModel,
    removeRandomLine,
    removeSection
} from "../reducer/tableReducer";
import {generateSection, regenerateSections} from "../service/SectionService";
import {RootState} from "../store/store";
import {
    changeAddLineModalShowedValue,
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
    const randomLines = useSelector((state: RootState) => state.table.lines);
    let widthOfModel = store.getState().form.widthOfModel;
    let numberOfLayers = store.getState().form.numberOfLayers;
    let portalNumber = 0;
    // @ts-ignore
    let stepLayer = store.getState().form.heightOfModel / store.getState().form.numberOfLayers;
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
                        <InputCellComponent value={{value:portal.distFromStart, onChange: (event: Event, newDistFromStart:number) => {
                                store.dispatch(generatePortals(regeneratePortal(portals, portal.id, newDistFromStart,
                                    portal.heightOfPortal, portal.numberOfPortalLayers, widthOfModel === null ? 0 : widthOfModel)));
                                store.dispatch(generateSections(regenerateSections(sections, portal.id, store.getState().table.portals, stepLayer,
                                    widthOfModel === null ? 0 : widthOfModel, numberOfLayers === null ? 0 : numberOfLayers)));
                            }}}/>
                        <td>{store.getState().form.widthOfModel}</td>
                        <InputCellComponent value={{value:portal.heightOfPortal, onChange: (event: Event, newHeightOfPortal:number) => {
                                store.dispatch(generatePortals(regeneratePortal(portals, portal.id, portal.distFromStart,
                                    newHeightOfPortal, portal.numberOfPortalLayers, widthOfModel === null ? 0 : widthOfModel)));
                                store.dispatch(generateSections(regenerateSections(sections, portal.id, store.getState().table.portals, stepLayer,
                                    widthOfModel === null ? 0 : widthOfModel, numberOfLayers === null ? 0 : numberOfLayers)));
                            }}}/>
                        <InputCellComponent value={{value:portal.numberOfPortalLayers, onChange: (event: Event, newNumberOfPortalLayers:number) => {
                                store.dispatch(generatePortals(regeneratePortal(portals, portal.id, portal.distFromStart,
                                    portal.heightOfPortal, newNumberOfPortalLayers, widthOfModel === null ? 0 : widthOfModel)));
                                store.dispatch(generateSections(regenerateSections(sections, portal.id, store.getState().table.portals, stepLayer,
                                    widthOfModel === null ? 0 : widthOfModel, numberOfLayers === null ? 0 : numberOfLayers)));
                            }}}/>
                        <td>
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
                    <AddLineComponent/>
                    </div>
                )
                }

                export default TableComponent;
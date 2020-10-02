import React from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {generatePortal, regeneratePortal} from "../service/PortalService";
import {actions, getModel, Portal, sendModel} from "../reducer/tableReducer";
import {generateSection, regenerateSections} from "../service/SectionService";
import {RootState} from "../store/store";
import {changeAddLineModalShowedValue,} from "../reducer/modalReducer";
import AddLineComponent from "./AddLineComponent";
import SplitModelComponent from "./SplitModelComponent";
import InputCellComponent from "./InputCellComponent";
import {Button} from "@blueprintjs/core";

// type StateProps = {
//     table: TableState,
//     widthOfModel: number | null,
//     numberOfLayers: number | null,
//     heightOfModel: number | null,
//     numberOfPortals: number | null
// }
//
// type DispatchProps = {
//     generateSections: (sections: Array<Section>) => void
// }
//
// type TableProps = StateProps & DispatchProps;
//
// let mapStateToProps = (state: RootState) => {
//     return {
//         table: state.table,
//         widthOfModel: state.form.widthOfModel,
//         numberOfLayers: state.form.numberOfLayers,
//         heightOfModel: state.form.heightOfModel,
//         numberOfPortals: state.form.numberOfPortals
//     }
// };

function TableComponent() {
    const store = useStore<RootState, any>();
    const portals = useSelector((state: RootState) => state.table.portals);
    const sections = useSelector((state: RootState) => state.table.sections);
    const randomLines = useSelector((state: RootState) => state.table.lines);
    const widthOfModel = useSelector((state: RootState) => state.modelForm.widthOfModel);
    const numberOfLayers = useSelector((state: RootState) => state.modelForm.numberOfLayers);
    const heightOfModel = useSelector((state: RootState) => state.modelForm.heightOfModel);
    const numberOfPortals = useSelector((state: RootState) => state.modelForm.numberOfPortals);

    const dispatch = useDispatch();

    let portalNumber = 0;
    let stepLayer = (heightOfModel === null ? 0 : heightOfModel) / (numberOfLayers === null ? 1 : numberOfLayers);

    function handleChangeTableParameter(portal: Portal, newDistanceFromStart?: number, newHeightOfPortal?: number,
                                        newNumberOfPortalLayers?: number) {
        dispatch(actions.generatePortals(regeneratePortal(portals, portal.id,
            newDistanceFromStart === undefined ? portal.distFromStart : newDistanceFromStart,
            newHeightOfPortal === undefined ? portal.heightOfPortal : newHeightOfPortal,
            newNumberOfPortalLayers === undefined ? portal.numberOfPortalLayers : newNumberOfPortalLayers,
            widthOfModel === null ? 0 : widthOfModel)));
        dispatch(actions.generateSections(regenerateSections(sections, portal.id, store.getState().table.portals, stepLayer,
            widthOfModel === null ? 0 : widthOfModel, numberOfLayers === null ? 0 : numberOfLayers)));
    }

    function buildNewPortal() {
        let generatedPortal;
        let stepLayer = (heightOfModel === null ? 0 : heightOfModel) /
            (numberOfLayers === null ? 0 : numberOfLayers);
        let portal = Array.from(portals).pop();
        if (portal !== undefined && heightOfModel !== null && widthOfModel !== null && numberOfPortals !== null) {
            generatedPortal = generatePortal(portal.step, portal.distFromStart + portal.step,
                heightOfModel, widthOfModel, numberOfPortals);
            dispatch(actions.addPortal(generatedPortal));
        }
        for (let numberOfSection = 0; numberOfSection < (numberOfLayers === null ? 0 : numberOfLayers);
             numberOfSection++) {
            let generatedSection;
            if (generatedPortal !== undefined && portal !== undefined) {
                generatedSection = generateSection(stepLayer, generatedPortal, portal,
                    widthOfModel === null ? 0 : widthOfModel);
            }
            if (generatedSection !== undefined) {
                stepLayer += stepLayer;
                dispatch(actions.addSection(generatedSection));
            }
        }
    }

    function removeLineFromModel(portal: Portal) {
        let removedLineId = portal.id;
        if (removedLineId === portals[0].id) {
            dispatch(actions.removeModel());
        } else {
            portal.portalLines.forEach(line => randomLines.forEach(randomLine => {
                if (randomLine.firstLineId === line.id) {
                    dispatch(actions.removeRandomLine(randomLine.firstLineId));
                } else if (randomLine.secondLineId === line.id) {
                    dispatch(actions.removeRandomLine(randomLine.secondLineId));
                }
            }));
            if (removedLineId === portals[portals.length - 1].id) {
                sections.forEach(section => {
                    if (section.firstPortalId === removedLineId || section.secondPortalId === removedLineId) {
                        dispatch(actions.removeSection(section.id));
                    }
                })
            }
        }
        dispatch(actions.removeLine(removedLineId));
    }

    return (
        <div className="container">
            <button type="button"
                    className="btn btn-outline-success"
                    onClick={(event) => {
                        buildNewPortal();
                    }}
            >Add
            </button>
            <button type="button" className=" ml-3 btn btn-outline-success" onClick={(event) => {
                dispatch(changeAddLineModalShowedValue(true));
            }}>Add Line
            </button>
            <SplitModelComponent/>
            <Button icon="export" text="Send" large={true} onClick={() => dispatch(sendModel(store.getState().table))}/>
            <Button icon="import" text="Get from the server" large={true} onClick={() => dispatch(getModel())}/>
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
                        <InputCellComponent value={portal.distFromStart} onChange={(newDistFromStart: number) =>
                            handleChangeTableParameter(portal, newDistFromStart)
                        }/>
                        <td>{widthOfModel}</td>
                        <InputCellComponent value={portal.heightOfPortal} onChange={(newHeightOfPortal: number) =>
                            handleChangeTableParameter(portal, undefined, newHeightOfPortal)
                        }/>
                        <InputCellComponent value={portal.numberOfPortalLayers}
                                            onChange={(newNumberOfPortalLayers: number) =>
                                                handleChangeTableParameter(portal, undefined, undefined, newNumberOfPortalLayers)
                                            }/>
                        <td>
                            <button
                                onClick={(event) => removeLineFromModel(portal)}
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

// export default connect(mapStateToProps)(TableComponent);
export default TableComponent;
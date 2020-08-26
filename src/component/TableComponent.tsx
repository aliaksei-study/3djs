import React, {ChangeEvent} from 'react';
import {useSelector, useStore} from "react-redux";
import {
    addPortal,
    addSection,
    FormState,
    generatePortals,
    generateSections,
    Line,
    Portal,
    removeLine,
    Section
} from "../formReducer";
import * as THREE from "three";

function generateSectionLine(numberOfIteration: number, stepLayer: number, previousPortal: Portal, nextPortal: Portal,
                            heightOfModel:number, widthOfModel:number, numberOfLine: number) : THREE.Vector3[] {
    let points: THREE.Vector3[] = [];
    switch(numberOfLine){
        case 0: {
            points.push(getSecondPortalPoint(previousPortal.distFromStart, heightOfModel -
                (numberOfIteration * stepLayer)));
            points.push(getThirdPortalPoint(previousPortal.distFromStart, heightOfModel -
                (numberOfIteration * stepLayer), widthOfModel));
            return points;
        }
        case 1: {
            points.push(getThirdPortalPoint(previousPortal.distFromStart, heightOfModel -
                (numberOfIteration * stepLayer), widthOfModel));
            points.push(getThirdPortalPoint(nextPortal.distFromStart, heightOfModel -
                (numberOfIteration * stepLayer), widthOfModel));
            return points;
        }
        case 2: {
            points.push(getSecondPortalPoint(nextPortal.distFromStart, heightOfModel -
                (numberOfIteration * stepLayer)));
            points.push(getThirdPortalPoint(nextPortal.distFromStart, heightOfModel -
                (numberOfIteration * stepLayer), widthOfModel));
            return points;
        }
        case 3: {
            points.push(getSecondPortalPoint(previousPortal.distFromStart, heightOfModel -
                (numberOfIteration * stepLayer)));
            points.push(getSecondPortalPoint(nextPortal.distFromStart, heightOfModel -
                (numberOfIteration * stepLayer)));
            return points;
        }
        default: {
            return points;
        }
    }
}

function generatePortalLine(numberOfLine: number, distFromStart:number, heightOfModel: number, widthOfModel: number) : THREE.Vector3[] {
    let points: THREE.Vector3[] = [];
    switch(numberOfLine) {
        case 0: {
            points.push(getFirstPortalPoint(distFromStart));
            points.push(getSecondPortalPoint(distFromStart, heightOfModel));
            return points;
        }
        case 1: {
            points.push(getSecondPortalPoint(distFromStart, heightOfModel));
            points.push(getThirdPortalPoint(distFromStart, heightOfModel, widthOfModel));
            return points;
        }
        case 2: {
            points.push(getThirdPortalPoint(distFromStart, heightOfModel, widthOfModel));
            points.push(getFourthPortalPoint(distFromStart, widthOfModel));
            return points;
        }
        default: {
            return points;
        }
    }
}

function getFirstPortalPoint(distFromStart: number) : THREE.Vector3 {
    return new THREE.Vector3(distFromStart, 0, 0);
}

function getSecondPortalPoint(distFromStart: number, heightOfModel: number): THREE.Vector3 {
    return new THREE.Vector3(distFromStart, heightOfModel, 0);
}

function getThirdPortalPoint(distFromStart: number, heightOfModel: number, widthOfModel: number): THREE.Vector3 {
    return new THREE.Vector3(distFromStart, heightOfModel, -widthOfModel)
}

function getFourthPortalPoint(distFromStart: number, widthOfModel: number) {
    return new THREE.Vector3(distFromStart, 0, -widthOfModel);
}

function stateIsNotNull(formState: FormState): boolean {
    return formState.lengthOfModel !== null && formState.numberOfPortals !== null && formState.numberOfLayers !== null &&
        formState.direction !== null && formState.widthOfModel !== null && formState.heightOfModel !== null;
}

function generatePortal(step: number, distFromStart: number, heightOfModel: number, portalWidth:number): Portal {
    let id;
    let numberOfPortalLines = 3;
    let portalLines: Line[] = [];
    for (let i = 0; i < numberOfPortalLines; i++) {
        id = Math.random();
        let points = generatePortalLine(i, distFromStart, heightOfModel, portalWidth);
        portalLines.push({id, points});
    }
    id = Math.random();
    return {id, step, distFromStart, portalWidth, portalLines}
}

function generateSection(numberOfLayer: number, stepLayer: number, curPortal: Portal, nextPortal: Portal,
                         heightOfModel: number, widthOfModel: number): Section {
    let numberOfSectionLines = 4;
    let id;
    let sectionLines: Line[] = [];
    for(let k = 0; k < numberOfSectionLines; k++) {
        let points = generateSectionLine(numberOfLayer, stepLayer, curPortal, nextPortal, heightOfModel, widthOfModel, k);
        id = Math.random();
        sectionLines.push({id, points});
    }
    id = Math.random();
    let firstPortalId = curPortal.id;
    let secondPortalId = nextPortal.id;
    return {id, firstPortalId, secondPortalId, sectionLines};
}

function changeNumberOfGeneratedSections(curPortal: Portal) {

}

function changeWidthOfGeneratedPortal(curPortal: Portal) {

}

function TableComponent() {
    const store = useStore<FormState, any>();
    const appState = useSelector<FormState, FormState["portals"]>((state) => state.portals);
    const modelHeight = useSelector<FormState, FormState["heightOfModel"]>((state) => state.heightOfModel);
    const modelNumberOfLayers = useSelector<FormState, FormState["numberOfLayers"]>((state) => state.numberOfLayers);
    let portalNumber = 1;
    return (
        <div className="container">
            <button type="button"
                    className="btn btn-outline-success mt-3 mx-auto d-block"
                    onClick={(event) => {
                        let portals: Portal[] = [];
                        let sections: Section[] = [];
                        let state = store.getState();
                        if (stateIsNotNull(state)) {
                            let distFromStart = 0;
                            let step = state.lengthOfModel == null ? 0: state.lengthOfModel /
                                (state.numberOfPortals == null ? 0: state.numberOfPortals - 1);
                            // @ts-ignore
                            for(let j = 0; j < state.numberOfPortals; j++) {
                                // @ts-ignore
                                portals.push(generatePortal(step, distFromStart, state.heightOfModel, state.widthOfModel));
                                distFromStart += step;
                            }
                            store.dispatch(generatePortals(portals));
                            let updatedState = store.getState();
                            // @ts-ignore
                            let stepLayer = updatedState.heightOfModel / updatedState.numberOfLayers;
                            for(let j = 0; j < (updatedState.numberOfPortals === null? 0 : updatedState.numberOfPortals - 1); j++) {
                                for (let i = 0; i < (updatedState.numberOfLayers === null ? 0 : updatedState.numberOfLayers); i++) {
                                    sections.push(generateSection(i, stepLayer, updatedState.portals[j], updatedState.portals[j+1],
                                        // @ts-ignore
                                        updatedState.lengthOfModel, updatedState.widthOfModel));
                                }
                            }
                            store.dispatch(generateSections(sections));
                        }
                    }
                    }>Generate
            </button>
            <button type="button"
                    className="btn btn-outline-success"
                    onClick={(event) => {
                        let state = store.getState();
                        let generatedPortal;
                        // @ts-ignore
                        let stepLayer = state.heightOfModel / state.numberOfLayers;
                        let portal = Array.from(state.portals).pop();
                        if(portal !== undefined && state.heightOfModel !== null) {
                            generatedPortal = generatePortal(portal.step, portal.distFromStart + portal.step, state.heightOfModel, portal.portalWidth);
                            store.dispatch(addPortal(generatedPortal));
                        }
                        for(let numberOfSection = 0; numberOfSection < (state.numberOfLayers === null ? 0 : state.numberOfLayers);
                            numberOfSection++) {
                            // @ts-ignore
                            let generatedSection = generateSection(numberOfSection, stepLayer, generatedPortal, portal,
                                state.heightOfModel, state.widthOfModel);
                            store.dispatch(addSection(generatedSection));
                        }
                    }}
            >Add</button>
            <button type="button" className=" ml-3 btn btn-outline-success" onClick={(event) => {
                let x = document.getElementById("addLine");
                if(x !== null) {
                    x.hidden = !x.hidden;
                }
            }}>Add Line</button>
            <div id="addLine" hidden>
                <select className="form-control">
                    <option>Choose firstLine</option>
                </select>
                <select className="form-control">
                    <option>Default select</option>
                </select>
            </div>
            <div id="editModel" hidden>
                <input type="number" className="form-control" id="newNumberOfSections" placeholder="new number of sections" />
                <input type="number" className="form-control" id="newWidthOfPortal" placeholder="new width of portal" />
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
                {appState.map(portal => (
                    <tr>
                        <td>{portalNumber++}</td>
                        <td>{portal.distFromStart}</td>
                        <td>{portal.portalWidth}</td>
                        <td>{modelHeight}</td>
                        <td>{modelNumberOfLayers}</td>
                        <td><button onClick={(event) => {
                            let x = document.getElementById("editModel");
                            let numberOfLayers = document.getElementById("newNumberOfSections");
                            let widthOfPortal = document.getElementById("newWidthOfPortal");
                            if(x !== null) {
                                x.hidden = !x.hidden;
                            }
                            if(numberOfLayers !== null) {
                                numberOfLayers.addEventListener("change", (event: Event) => {
                                    changeNumberOfGeneratedSections(portal);
                                }, false)
                            }
                            if(widthOfPortal !== null) {
                                widthOfPortal.addEventListener("change", (event) => {
                                    changeWidthOfGeneratedPortal(portal);
                                })
                            }
                        }}>Edit</button> <button
                            onClick={(event) => {
                                let removedLineId = portal.id;
                                store.dispatch(removeLine(removedLineId));
                            }}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent;
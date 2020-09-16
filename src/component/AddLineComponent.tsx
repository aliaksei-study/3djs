import React, {ChangeEvent} from 'react';
import {Button, Form, Modal} from 'react-bootstrap'
import {useDispatch, useSelector, useStore} from "react-redux";
import {RootState} from "../store/store";
import {changeAddLineModalShowedValue} from "../reducer/modalReducer";
import {setDistFromStart, setFirstLineId, setSecondLineId} from "../reducer/addLineReducer";
import {generateLine} from "../service/LineService";
import {addLine, Line, Portal, Section} from "../reducer/tableReducer";

export type MapEntryType = {
    key: string,
    value: number
}

export function saveIDsToMap(portalsId: Array<number>, sectionsId: Array<number>, randomLinesIds: Array<number>, map: Array<MapEntryType>) {
    for (let i = 0; i < portalsId.length; i++) {
        map.push({key: "B - " + i, value: portalsId[i]})
    }
    for (let i = 0; i < sectionsId.length; i++) {
        map.push({key: "C - " + i, value: sectionsId[i]})
    }
    for(let i = 0; i < randomLinesIds.length; i++) {
        map.push({key: "R - " + i, value: randomLinesIds[i]})
    }
}

function AddLineComponent() {
    const store = useStore<RootState, any>();
    let map = new Array<MapEntryType>();
    const portals: Array<Portal> = store.getState().table.portals;
    const sections: Array<Section> = store.getState().table.sections;
    const randomLines: Array<Line> = store.getState().table.lines;
    const isShowed = useSelector((state: RootState) => state.modal.isAddLineModalShowed);
    const portalsId = useSelector((state: RootState) => state.table.portals.flatMap(portal =>
        portal.portalLines.map(portalLine => portalLine.id)));
    const sectionsId = useSelector((state: RootState) => state.table.sections.flatMap(section =>
        section.sectionLines.map(sectionLine => sectionLine.id)));
    const randomLinesIds = useSelector((state: RootState) => state.table.lines.map(line => line.id));
    const dispatch = useDispatch();

    saveIDsToMap(portalsId, sectionsId, randomLinesIds, map);

    function addModelLine() {
        let firstLineId = store.getState().addLine.firstLineId;
        let secondLineId = store.getState().addLine.secondLineId;
        let distFromStart = store.getState().addLine.distFromStart;
        if (firstLineId !== null && secondLineId !== null && distFromStart !== null) {
            let lines: Array<Line> = new Array<Line>();
            portals.forEach(portal => portal.portalLines.forEach(line => {
                if (line.id === store.getState().addLine.firstLineId || line.id === store.getState().addLine.secondLineId) {
                    lines.push(line);
                }
            }));
            sections.forEach(section => section.sectionLines.forEach(line => {
                if (line.id === store.getState().addLine.firstLineId || line.id === store.getState().addLine.secondLineId) {
                    lines.push(line);
                }
            }));
            randomLines.forEach(randomLine =>{
                if (randomLine.id === store.getState().addLine.firstLineId || randomLine.id === store.getState().addLine.secondLineId) {
                    lines.push(randomLine);
                }
            });
            let generatedLine = generateLine(lines, distFromStart, firstLineId, secondLineId);
            dispatch(addLine(generatedLine));
        }
    }

    return (
        <Modal show={isShowed} onHide={(event: Event) => {
            dispatch(changeAddLineModalShowedValue(false));
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Add line</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="container">
                    <Form>
                        <Form.Group controlId="firstLineSelect">
                            <Form.Label>Select the id of first Line</Form.Label>
                            <Form.Control as="select" onChange={(event) => {
                                let selectedObject = map.find((value: MapEntryType, index: number) => {
                                    return value.key === event.target.value;
                                });
                                if (selectedObject !== undefined) {
                                    dispatch(setFirstLineId(selectedObject.value));
                                }
                            }}>
                                <option>Choose first line id</option>
                                {
                                    map.map((item: MapEntryType, i: number) => (
                                        <option key={i}>{item.key}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="secondLineSelect">
                            <Form.Label>Select the id of second line</Form.Label>
                            <Form.Control as="select" onChange={(event) => {
                                let selectedObject = map.find((value: MapEntryType, index: number) => {
                                    return value.key === event.target.value;
                                });
                                if (selectedObject !== undefined) {
                                    dispatch(setSecondLineId(selectedObject.value));
                                }
                            }}>
                                <option>Choose second line id</option>
                                {
                                    map.map((item: MapEntryType, i: number) => (
                                        <option key={i}>{item.key}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="distFromStartInput" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            dispatch(setDistFromStart(+event.target.value));
                        }}>
                            <Form.Label>Distance from start</Form.Label>
                            <Form.Control type="number" placeholder="Enter distance from start"/>
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    dispatch(changeAddLineModalShowedValue(false));
                }}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    addModelLine();
                    dispatch(changeAddLineModalShowedValue(false));
                }}>
                    Add line
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddLineComponent;
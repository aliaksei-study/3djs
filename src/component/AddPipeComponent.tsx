import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {changeAddPipeShowedValue} from "../reducer/modalReducer";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {RootState} from "../store/store";
import {
    changeDirection,
    changeFirstBeamCoordinateX,
    changeFirstBeamCoordinateY,
    changeFirstBeamCoordinateZ,
    changeFirstBeamId,
    changeNextPipeId,
    changeOuterDiameter,
    changeSecondBeamCoordinateX,
    changeSecondBeamCoordinateY,
    changeSecondBeamCoordinateZ,
    changeSecondBeamId,
    changeThickness
} from "../reducer/pipeModalFormReducer";
import {MapEntryType} from "./AddLineComponent";
import {Line, RandomLine} from "../reducer/tableReducer";
import {addNewPipe, Beam, Pipe} from "../reducer/PipeModalReducer";
import {setSecondLineId} from "../reducer/addLineReducer";

function isRandomLine(lineOrRandomLine: Line | RandomLine): lineOrRandomLine is RandomLine {
    return (lineOrRandomLine as RandomLine).firstLineId !== undefined;
}

function getNotNullValue(value: number | null): number {
    if(value as number !== null) {
        return value as number;
    } else {
        return 0;
    }
}

function createMapEntryType<T extends Line | RandomLine>(t: T, i: number): MapEntryType {
    if(isRandomLine(t)) {
        return {key:"R - " + i, value:t.id};
    } else {
        return {key:"L - " + i, value:t.id};
    }
}

function getHorizontalLinesParallelToRequiredCoordinate<T extends Line | RandomLine>(lines: Array<T>, coordinate: string): MapEntryType[] {
    let mapLines = Array<MapEntryType>();
    for(let i = 0; i < lines.length; i++) {
        if(coordinate.includes("x") && (lines[i].points[0].z !== lines[i].points[1].z) && (lines[i].points[0].x === lines[i].points[1].x)) {
            mapLines.push(createMapEntryType<T>(lines[i], i));
        } else if(coordinate.includes("z") && (lines[i].points[0].x !== lines[i].points[1].x) && (lines[i].points[0].z === lines[i].points[1].z)) {
            mapLines.push(createMapEntryType<T>(lines[i], i));
        }
    }
    return mapLines;
}

function AddPipeComponent() {
    const dispatch = useDispatch();
    const store = useStore<RootState>();
    const [selectLines, setSelectLines] = useState<Array<MapEntryType>>([]);
    const isShowed = useSelector((state: RootState) => state.modal.isAddPipeModalShowed);
    const horizontalPortalLines = useSelector((state: RootState) => state.table.portals.flatMap(portal => portal.portalLines)
        .filter(portalLine => portalLine.points[0].y === portalLine.points[1].y));
    const horizontalSectionLines = useSelector((state: RootState) => state.table.sections.flatMap(section => section.sectionLines)
        .filter(sectionLine => sectionLine.points[0].y === sectionLine.points[1].y));
    const horizontalRandomLines = useSelector((state: RootState) => state.table.lines).filter(randomLine =>
        randomLine.points[0].y === randomLine.points[1].y);
    const pipeIds = useSelector((state: RootState) => state.pipeModal.pipes.map(pipe => pipe.id));
    let linesMap: Array<MapEntryType>;

    function saveIdsToMapWithDirection(direction:string) {
        linesMap = [];
        if(direction.includes("+x") || direction.includes("-x")) {
            linesMap.push.apply(linesMap, getHorizontalLinesParallelToRequiredCoordinate(horizontalRandomLines, "x"));
            linesMap.push.apply(linesMap, getHorizontalLinesParallelToRequiredCoordinate(horizontalSectionLines, "x"));
            linesMap.push.apply(linesMap, getHorizontalLinesParallelToRequiredCoordinate(horizontalPortalLines, "x"));
        } else if(direction.includes("+z") || direction.includes("-z")) {
            linesMap.push.apply(linesMap, getHorizontalLinesParallelToRequiredCoordinate(horizontalRandomLines, "z"));
            linesMap.push.apply(linesMap, getHorizontalLinesParallelToRequiredCoordinate(horizontalSectionLines, "z"));
            linesMap.push.apply(linesMap, getHorizontalLinesParallelToRequiredCoordinate(horizontalPortalLines, "z"));
        }
        console.log(linesMap);
        setSelectLines(linesMap);
    }

    let generatePipe = () => {
        let pipeFormState = store.getState().pipeModalForm;
        let startBeam: Beam = {
            lineId: getNotNullValue(pipeFormState.firstBeamId),
            coordinateX: getNotNullValue(pipeFormState.firstBeamCoordinateX),
            coordinateY: getNotNullValue(pipeFormState.firstBeamCoordinateY),
            coordinateZ: getNotNullValue(pipeFormState.firstBeamCoordinateZ),
        };
        let endBeam:Beam = {
            lineId: getNotNullValue(pipeFormState.secondBeamId),
            coordinateX: getNotNullValue(pipeFormState.secondBeamCoordinateX),
            coordinateY: getNotNullValue(pipeFormState.secondBeamCoordinateY),
            coordinateZ: getNotNullValue(pipeFormState.secondBeamCoordinateZ),
        };
        let pipe: Pipe = {
            id: Math.random(),
            direction: pipeFormState.direction,
            startBeam: startBeam,
            endBeam: endBeam,
            outerDiameter: getNotNullValue(pipeFormState.outerDiameter),
            thickness: getNotNullValue(pipeFormState.thickness),
            nextPipeId: pipeFormState.nextPipeId,
        };
        console.log(pipe);
        dispatch(addNewPipe(pipe));
    };

    return (
        <Modal show={isShowed} onHide={(event: Event) => {
            dispatch(changeAddPipeShowedValue(false));
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Add pipe modal</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group controlId="directionSelect">
                        <Form.Label>Direction select</Form.Label>
                        <Form.Control as="select" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            saveIdsToMapWithDirection(event.target.value);
                            dispatch(changeDirection(event.target.value));
                        }}>
                            <option>Choose direction</option>
                            <option>+x</option>
                            <option>-x</option>
                            <option>+y</option>
                            <option>-y</option>
                            <option>+z</option>
                            <option>-z</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Label>Start</Form.Label>
                    <Form.Group controlId="startBeamSelect">
                        <Form.Label>Beam select</Form.Label>
                        <Form.Control as="select" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            let selectedObject = selectLines.find((value: MapEntryType, index: number) => {
                                return value.key === event.target.value;
                            });
                            if (selectedObject !== undefined) {
                                dispatch(changeFirstBeamId(selectedObject.value));
                            }
                        }}>
                            <option>Choose start Beam</option>
                            {
                                selectLines.map((item: MapEntryType, i: number) => (
                                    <option key={i}>{item.key}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="startX">
                            <Form.Label>X coordinate</Form.Label>
                            <Form.Control type="number" onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                dispatch(changeFirstBeamCoordinateX(+event.target.value))
                            }/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="startY">
                            <Form.Label>Y coordinate</Form.Label>
                            <Form.Control type="number" onChange={(event:ChangeEvent<HTMLInputElement>) =>
                                dispatch(changeFirstBeamCoordinateY(+event.target.value))
                            }/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="startZ">
                            <Form.Label>Z coordinate</Form.Label>
                            <Form.Control type="number" onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                dispatch(changeFirstBeamCoordinateZ(+event.target.value))
                            }/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Label>End</Form.Label>
                    <Form.Group controlId="endBeamSelect">
                        <Form.Label>Beam select</Form.Label>
                        <Form.Control as="select" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            let selectedObject = selectLines.find((value: MapEntryType, index: number) => {
                                return value.key === event.target.value;
                            });
                            if (selectedObject !== undefined) {
                                dispatch(changeSecondBeamId(selectedObject.value));
                            }
                        }}>
                            <option>Choose end Beam</option>
                            {
                                selectLines.map((item: MapEntryType, i: number) => (
                                    <option key={i}>{item.key}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="endX">
                            <Form.Label>X coordinate</Form.Label>
                            <Form.Control type="number" onChange={(event:ChangeEvent<HTMLInputElement>) =>
                                dispatch(changeSecondBeamCoordinateX(+event.target.value))
                            }/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="endY">
                            <Form.Label>Y coordinate</Form.Label>
                            <Form.Control type="number" onChange={(event:ChangeEvent<HTMLInputElement>) =>
                                dispatch(changeSecondBeamCoordinateY(+event.target.value))
                            }/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="endZ">
                            <Form.Label>Z coordinate</Form.Label>
                            <Form.Control type="number" onChange={(event:ChangeEvent<HTMLInputElement>) =>
                                dispatch(changeSecondBeamCoordinateZ(+event.target.value))
                            }/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="outerDiameter">
                            <Form.Label>outer diameter</Form.Label>
                            <Form.Control type="number" onChange={(event:ChangeEvent<HTMLInputElement>) =>
                                dispatch(changeOuterDiameter(+event.target.value))
                            }/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="thickness">
                            <Form.Label>Thickness</Form.Label>
                            <Form.Control type="number" onChange={(event:ChangeEvent<HTMLInputElement>) =>
                                dispatch(changeThickness(+event.target.value))
                            }/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="nextPipe">
                            <Form.Label>Next pipe</Form.Label>
                            <Form.Control as="select" onChange={(event:ChangeEvent<HTMLInputElement>) =>
                                dispatch(changeNextPipeId(+event.target.value))
                            }>
                                <option>Choose pipe id</option>
                                {
                                    pipeIds.map((pipeId: number) => (
                                        <option key={pipeId}>{pipeId}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    dispatch(changeAddPipeShowedValue(false));
                }}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    generatePipe();
                    dispatch(changeAddPipeShowedValue(false));
                }}>
                    Add pipe
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddPipeComponent;
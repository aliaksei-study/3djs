import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeAddPipeShowedValue} from "../reducer/modalReducer";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {RootState} from "../store/store";
import {
    changeDirection,
    changeFirstBeamCoordinateX,
    changeFirstBeamCoordinateY,
    changeFirstBeamCoordinateZ,
    changeFirstBeamId, changeNextPipeId, changeOuterDiameter,
    changeSecondBeamCoordinateX,
    changeSecondBeamCoordinateY,
    changeSecondBeamCoordinateZ,
    changeSecondBeamId, changeThickness
} from "../reducer/pipeModalFormReducer";

function AddPipeComponent() {
    const dispatch = useDispatch();
    const isShowed = useSelector((state: RootState) => state.modal.isAddPipeModalShowed);
    const horizontalPortalLines = useSelector((state: RootState) => state.table.portals.flatMap(portal => portal.portalLines)
        .filter(portalLine => portalLine.points[0].y === portalLine.points[1].y));
    const horizontalSectionLines = useSelector((state: RootState) => state.table.sections.flatMap(section => section.sectionLines)
        .filter(sectionLine => sectionLine.points[0].y === sectionLine.points[1].y));
    const horizontalRandomLines = useSelector((state: RootState) => state.table.lines).filter(randomLine =>
        randomLine.points[0].y === randomLine.points[1].y);

    let generatePipe = () => {
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
                        <Form.Control as="select" onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            dispatch(changeDirection(event.target.value))
                        }>
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
                        <Form.Control as="select" onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            dispatch(changeFirstBeamId(+event.target.value))
                        }>
                            <option>1</option>
                            <option>2</option>
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
                        <Form.Control as="select" onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            dispatch(changeSecondBeamId(+event.target.value))
                        }>
                            <option>1</option>
                            <option>2</option>
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
                                <option>1</option>
                                <option>2</option>
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
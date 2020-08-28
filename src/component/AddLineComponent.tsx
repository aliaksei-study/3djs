import React, {useState} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import {useSelector, useStore} from "react-redux";
import {RootState} from "../store/store";
import {setPortalId} from "../reducer/editPortalReducer";
import {changeAddLineModalShowedValue} from "../reducer/modalReducer";

function AddLineComponent() {
    const store = useStore<RootState, any>();
    const isShowed = useSelector((state: RootState) => state.modal.isAddLineModalShowed);
    const portalsId = useSelector((state: RootState) => state.table.portals.map(portal => portal.id));
    const sectionsId = useSelector((state: RootState) => state.table.sections.flatMap(section =>
        section.sectionLines.map(sectionLine => sectionLine.id)));
    let elementsId = portalsId.concat(sectionsId);
    let firstSelectId =1, secondSelectId = 1;
    return (
        <Modal show={isShowed} onHide={(event: Event) => {
            store.dispatch(setPortalId(null));
            store.dispatch(changeAddLineModalShowedValue(false));
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Add line</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="container">
                    <Form>
                        <Form.Group controlId="firstLineSelect">
                            <Form.Label>Select the id of first Line</Form.Label>
                            <Form.Control as="select">
                                {
                                    elementsId.map(elementId => (
                                    <option key={elementId}>{firstSelectId++}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="secondLineSelect">
                            <Form.Label>Select the id of second line</Form.Label>
                            <Form.Control as="select">
                                {elementsId.map(elementId => (
                                    <option key={elementId}>{secondSelectId++}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    store.dispatch(setPortalId(null));
                    store.dispatch(changeAddLineModalShowedValue(false));
                }}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    store.dispatch(setPortalId(null));
                    store.dispatch(changeAddLineModalShowedValue(false));
                }}>
                    Add line
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddLineComponent;
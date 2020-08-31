import React, {useState} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import {RootState} from "../store/store";
import {useSelector, useStore} from "react-redux";
import {setPortalId} from "../reducer/editPortalReducer";
import {changeEditPortalModalShowedValue} from "../reducer/modalReducer";

function regeneratePortal(portalId: number, newDistFromStart: number, newHeightOfPortal: number, newNumberOfLayers: number) {

}

function EditPortalComponent() {
    const store = useStore<RootState, any>();
    const isShowed = useSelector((state: RootState) => state.modal.isEditPortalModalShowed);
    const portalId = useSelector((state: RootState) => state.editPortal.portalId);
    const selectedPortal = (useSelector((state: RootState) =>
        state.table.portals.filter(portal => portal.id === portalId))).pop();
    return (
        <Modal show={isShowed} onHide={(event: Event) => {
            store.dispatch(setPortalId(null));
            store.dispatch(changeEditPortalModalShowedValue(false));
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Edit model parameters</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="container">
                    <Form>
                        <Form.Group controlId="distFromStartInput">
                            <Form.Label>Distance from start</Form.Label>
                            <Form.Control type="number" placeholder="Enter distance from start"
                                          defaultValue={selectedPortal?.distFromStart}/>
                        </Form.Group>
                        <Form.Group controlId="heightOfPortalInput">
                            <Form.Label>Height of model</Form.Label>
                            <Form.Control type="number" placeholder="Enter height of portal"
                                          defaultValue={selectedPortal?.heightOfPortal}/>
                        </Form.Group>
                        <Form.Group controlId="numberOfLayersInput">
                            <Form.Label>Number of layers</Form.Label>
                            <Form.Control type="number" placeholder="Enter number of layers"
                                          defaultValue={selectedPortal?.numberOfPortalLayers}/>
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    store.dispatch(setPortalId(null));
                    store.dispatch(changeEditPortalModalShowedValue(false));
                }}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    let newDistFromStart = +(document.getElementById("distFromStartInput") as HTMLInputElement).value;
                    let newHeightOfPortal = +(document.getElementById("heightOfPortalInput") as HTMLInputElement).value;
                    let newNumberOfLayers = +(document.getElementById("numberOfLayers") as HTMLInputElement).value;
                    regeneratePortal(portalId === null ? 0: portalId, newDistFromStart, newHeightOfPortal, newNumberOfLayers);
                    store.dispatch(setPortalId(null));
                    store.dispatch(changeEditPortalModalShowedValue(false));
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditPortalComponent;
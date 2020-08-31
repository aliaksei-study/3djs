import React, {useState} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import {RootState} from "../store/store";
import {useSelector, useStore} from "react-redux";
import {setPortalId} from "../reducer/editPortalReducer";
import {changeEditPortalModalShowedValue} from "../reducer/modalReducer";
import {generatePortals, generateSections, Portal, Section} from "../reducer/tableReducer";
import {generatePortal} from "../service/PortalService";
import {generateSection} from "../service/SectionService";

function regeneratePortal(portals: Array<Portal>, portalId: number, newDistFromStart: number, newHeightOfPortal: number,
                          newNumberOfLayers: number, widthOfModel: number): Array<Portal> {
    let editablePortals = Array.from(portals);
    let generatedPortal = generatePortal(newDistFromStart, newDistFromStart, newHeightOfPortal, widthOfModel, newNumberOfLayers);
    generatedPortal.id = portalId;
    let index = editablePortals.findIndex(portal => portal.id === portalId);
    editablePortals.splice(index, 1, generatedPortal);
    return editablePortals;
}

function regenerateSections(sections: Array<Section>, portalId: number, portals: Array<Portal>, stepLayer: number,
                            widthOfModel: number, numberOfLayers: number): Array<Section> {
    let editablePortals = Array.from(portals);
    let editableSections = Array.from(sections);
    let changedSections: Array<Section> = Array.from(sections).filter(section => section.firstPortalId === portalId ||
        section.secondPortalId === portalId);
    console.log(changedSections);
    let sectionId;
    for (let i = 0, key = 0; i < changedSections.length; i++, key++) {
        let newSection;
        sectionId = changedSections[i].id;
        let firstPortal = editablePortals.find(portal => portal.id === changedSections[i].firstPortalId);
        let secondPortal = editablePortals.find(portal => portal.id === changedSections[i].secondPortalId);
        if (key === numberOfLayers) {
            key = 0;
        }
        if (firstPortal !== undefined && secondPortal !== undefined) {
            newSection = generateSection(stepLayer * (key + 1), firstPortal, secondPortal, widthOfModel);
            newSection.id = sectionId;
        }
        if (newSection !== undefined) {
            editableSections.splice(editableSections.indexOf(changedSections[i]), 1, newSection);
        }
    }
    return editableSections;
}

function EditPortalComponent() {
    const store = useStore<RootState, any>();
    const isShowed = useSelector((state: RootState) => state.modal.isEditPortalModalShowed);
    const portalId = useSelector((state: RootState) => state.editPortal.portalId);
    const portals = useSelector((state: RootState) => state.table.portals);
    const sections = useSelector((state: RootState) => state.table.sections);
    const selectedPortal = (useSelector((state: RootState) =>
        state.table.portals.filter(portal => portal.id === portalId))).pop();
    let numberOfLayers = useSelector((state: RootState) => state.form.numberOfLayers);
    // @ts-ignore
    let stepLayer = store.getState().form.heightOfModel / store.getState().form.numberOfLayers;
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
                    let widthOfModel = store.getState().form.widthOfModel;
                    let newDistFromStart = +(document.getElementById("distFromStartInput") as HTMLInputElement).value;
                    let newHeightOfPortal = +(document.getElementById("heightOfPortalInput") as HTMLInputElement).value;
                    let newNumberOfLayers = +(document.getElementById("numberOfLayersInput") as HTMLInputElement).value;
                    store.dispatch(generatePortals(regeneratePortal(portals, portalId === null ? 0 : portalId, newDistFromStart,
                        newHeightOfPortal, newNumberOfLayers, widthOfModel === null ? 0 : widthOfModel)));
                    store.dispatch(generateSections(regenerateSections(sections, portalId === null ? 0 : portalId,
                        store.getState().table.portals, stepLayer, widthOfModel === null ? 0 : widthOfModel,
                        numberOfLayers === null ? 0 : numberOfLayers)));
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
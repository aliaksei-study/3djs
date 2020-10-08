import React from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {RootState} from "../store/store";
import {changeAddLineModalShowedValue} from "../reducer/modalReducer";
import {useForm} from "react-hook-form";
import {Button, Classes, Dialog, HTMLSelect, NumericInput} from "@blueprintjs/core";
import {getModelRandomLine} from "../service/LineService";
import {actions} from "../reducer/tableReducer";

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
    for (let i = 0; i < randomLinesIds.length; i++) {
        map.push({key: "R - " + i, value: randomLinesIds[i]})
    }
}

// function AddLineComponent() {
//     const store = useStore<RootState, any>();
//     let map = new Array<MapEntryType>();
//     const portals: Array<Portal> = store.getState().table.portals;
//     const sections: Array<Section> = store.getState().table.sections;
//     const randomLines: Array<Line> = store.getState().table.lines;
//     const isShowed = useSelector((state: RootState) => state.modal.isAddLineModalShowed);
//     const portalsId = useSelector((state: RootState) => state.table.portals.flatMap(portal =>
//         portal.portalLines.map(portalLine => portalLine.id)));
//     const sectionsId = useSelector((state: RootState) => state.table.sections.flatMap(section =>
//         section.sectionLines.map(sectionLine => sectionLine.id)));
//     const randomLinesIds = useSelector((state: RootState) => state.table.lines.map(line => line.id));
//     const dispatch = useDispatch();
//
//     saveIDsToMap(portalsId, sectionsId, randomLinesIds, map);
//
//     function addModelLine() {
//         let firstLineId = store.getState().addLine.firstLineId;
//         let secondLineId = store.getState().addLine.secondLineId;
//         let distFromStart = store.getState().addLine.distFromStart;
//         if (firstLineId !== null && secondLineId !== null && distFromStart !== null) {
//             let lines: Array<Line> = new Array<Line>();
//             portals.forEach(portal => portal.portalLines.forEach(line => {
//                 if (line.id === store.getState().addLine.firstLineId || line.id === store.getState().addLine.secondLineId) {
//                     lines.push(line);
//                 }
//             }));
//             sections.forEach(section => section.sectionLines.forEach(line => {
//                 if (line.id === store.getState().addLine.firstLineId || line.id === store.getState().addLine.secondLineId) {
//                     lines.push(line);
//                 }
//             }));
//             randomLines.forEach(randomLine =>{
//                 if (randomLine.id === store.getState().addLine.firstLineId || randomLine.id === store.getState().addLine.secondLineId) {
//                     lines.push(randomLine);
//                 }
//             });
//             let generatedLine = generateLine(lines, distFromStart, firstLineId, secondLineId);
//             dispatch(actions.addLine(generatedLine));
//         }
//     }
//
//     return (
//         <Modal show={isShowed} onHide={(event: Event) => {
//             dispatch(changeAddLineModalShowedValue(false));
//         }}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Add line</Modal.Title>
//             </Modal.Header>
//
//             <Modal.Body>
//                     <Form>
//                         <Form.Group controlId="firstLineSelect">
//                             <Form.Label>Select the id of first Line</Form.Label>
//                             <Form.Control as="select" onChange={(event) => {
//                                 let selectedObject = map.find((value: MapEntryType, index: number) => {
//                                     return value.key === event.target.value;
//                                 });
//                                 if (selectedObject !== undefined) {
//                                     dispatch(setFirstLineId(selectedObject.value));
//                                 }
//                             }}>
//                                 <option>Choose first line id</option>
//                                 {
//                                     map.map((item: MapEntryType, i: number) => (
//                                         <option key={i}>{item.key}</option>
//                                     ))
//                                 }
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="secondLineSelect">
//                             <Form.Label>Select the id of second line</Form.Label>
//                             <Form.Control as="select" onChange={(event) => {
//                                 let selectedObject = map.find((value: MapEntryType, index: number) => {
//                                     return value.key === event.target.value;
//                                 });
//                                 if (selectedObject !== undefined) {
//                                     dispatch(setSecondLineId(selectedObject.value));
//                                 }
//                             }}>
//                                 <option>Choose second line id</option>
//                                 {
//                                     map.map((item: MapEntryType, i: number) => (
//                                         <option key={i}>{item.key}</option>
//                                     ))
//                                 }
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="distFromStartInput" onChange={(event: ChangeEvent<HTMLInputElement>) => {
//                             dispatch(setDistFromStart(+event.target.value));
//                         }}>
//                             <Form.Label>Distance from start</Form.Label>
//                             <Form.Control type="number" placeholder="Enter distance from start"/>
//                         </Form.Group>
//                     </Form>
//
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={() => {
//                     dispatch(changeAddLineModalShowedValue(false));
//                 }}>
//                     Close
//                 </Button>
//                 <Button variant="primary" onClick={() => {
//                     addModelLine();
//                     dispatch(changeAddLineModalShowedValue(false));
//                 }}>
//                     Add line
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }
//
// export default AddLineComponent;

interface IFormInput {
    firstLineId: number,
    secondLineId: number,
    distFromStart: number
}

export default function App() {
    const store = useStore<RootState>();
    const {register, handleSubmit, errors} = useForm<IFormInput>();
    let map = new Array<MapEntryType>();
    const portals = useSelector((state: RootState) => state.table.portals);
    const sections = useSelector((state: RootState) => state.table.sections);
    const randomLines = useSelector((state: RootState) => state.table.lines);
    const isShowed = useSelector((state: RootState) => state.modal.isAddLineModalShowed);
    const portalsId = useSelector((state: RootState) => state.table.portals.flatMap(portal =>
        portal.portalLines.map(portalLine => portalLine.id)));
    const sectionsId = useSelector((state: RootState) => state.table.sections.flatMap(section =>
        section.sectionLines.map(sectionLine => sectionLine.id)));
    const randomLinesIds = useSelector((state: RootState) => state.table.lines.map(line => line.id));
    const dispatch = useDispatch();

    saveIDsToMap(portalsId, sectionsId, randomLinesIds, map);

    const onSubmit = (data: IFormInput) => {
        // dispatch(actions.addLine((getModelRandomLine(portals, sections,
        //     randomLines, data.firstLineId, data.secondLineId, data.distFromStart))));
        dispatch(changeAddLineModalShowedValue(false));
    };

    return (
        <Dialog isOpen={isShowed}
                title={'Add Line form'}
                onClose={() => dispatch(changeAddLineModalShowedValue(false))}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={Classes.DIALOG_BODY}>
                    <HTMLSelect className={`form-field${errors.firstLineId ? ' error-form-field' : ''}`}
                                name={'firstLineId'}
                                fill={true}
                                elementRef={register({required: true})}>
                        <option value={''}>Choose first line id</option>
                        {
                            map.map((item: MapEntryType, i: number) => (
                                <option key={i} value={item.value}>{item.key}</option>
                            ))
                        }
                    </HTMLSelect>
                    {errors.firstLineId && <span style={{color: 'red'}}>This field is required</span>}
                    <HTMLSelect className={`form-field${errors.secondLineId ? ' error-form-field' : ''}`}
                                name={'secondLineId'}
                                fill={true}
                                elementRef={register({required: true})}>
                        <option value={''}>Choose second line id</option>
                        {
                            map.map((item: MapEntryType, i: number) => (
                                <option key={i} value={item.value}>{item.key}</option>
                            ))
                        }
                    </HTMLSelect>
                    {errors.secondLineId && <span style={{color: 'red'}}>This field is required</span>}
                    <NumericInput className={`form-field${errors.distFromStart ? ' error-form-field' : ''}`}
                                  placeholder={'Enter distance from start'}
                                  buttonPosition={'none'}
                                  name={'distFromStart'} fill={true}
                                  type={'number'}
                                  inputRef={register({required: true, min: 0, max: 20})}/>
                    {errors.distFromStart?.type==='required' && <span style={{color: 'red'}}>This field is required</span>}
                    {(errors.distFromStart?.type==='min' || errors.distFromStart?.type==='min') &&
                    <span style={{color: 'red'}}>Field should be from 0 to 20</span>}
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <Button type={'submit'}
                            rightIcon="arrow-right"
                            intent="success"
                            text="Next step"/>
                </div>
            </form>
        </Dialog>
    );
}
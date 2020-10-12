import React from 'react';
import {useDispatch, useSelector} from "react-redux";
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

interface IFormInput {
    firstLineId: number,
    secondLineId: number,
    distFromStart: number
}

export default function App() {
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
         dispatch(actions.addLine((getModelRandomLine(portals, sections,
             randomLines, Number(data.firstLineId), Number(data.secondLineId), data.distFromStart))));
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
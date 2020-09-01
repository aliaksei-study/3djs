import {Portal} from "../reducer/tableReducer";
import * as THREE from "three";
import {Line, Section} from "../reducer/tableReducer";
import {getLinePoints} from "./PortalService";

export function generateSection(stepLayer: number, curPortal: Portal, nextPortal: Portal, widthOfModel:number): Section {
    let numberOfLines = 2;
    let id;
    let sectionLines: Line[] = [];
    let layerHeight = 0;
    for(let i = 0; i < numberOfLines; i++) {
        let points: THREE.Vector3[] = [];
        points.push(getLinePoints(curPortal.distFromStart, layerHeight + stepLayer, i === 0 ? i : -widthOfModel));
        points.push(getLinePoints(nextPortal.distFromStart, layerHeight + stepLayer, i === 0 ? i : -widthOfModel));
        id = Math.random();
        sectionLines.push({id, points});
    }
    id = Math.random();
    let firstPortalId = curPortal.id;
    let secondPortalId = nextPortal.id;
    return {id, firstPortalId, secondPortalId, sectionLines};
}
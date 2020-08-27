import {Portal} from "../reducer/tableReducer";
import * as THREE from "three";
import {getSecondPortalPoint, getThirdPortalPoint} from "./PortalService";
import {Line, Section} from "../reducer/tableReducer";

export function generateSection(numberOfLayer: number, stepLayer: number, curPortal: Portal, nextPortal: Portal,
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

export function generateSectionLine(numberOfIteration: number, stepLayer: number, previousPortal: Portal, nextPortal: Portal,
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
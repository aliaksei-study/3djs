import * as THREE from "three";
import {Line, Portal} from "../reducer/tableReducer";

export function generatePortal(step: number, distFromStart: number, heightOfModel: number, portalWidth:number): Portal {
    let id;
    let numberOfPortalLines = 3;
    let portalLines: Line[] = [];
    for (let i = 0; i < numberOfPortalLines; i++) {
        id = Math.random();
        let points = generatePortalLine(i, distFromStart, heightOfModel, portalWidth);
        portalLines.push({id, points});
    }
    id = Math.random();
    return {id, step, distFromStart, portalWidth, portalLines}
}

export function generatePortalLine(numberOfLine: number, distFromStart:number, heightOfModel: number, widthOfModel: number) : THREE.Vector3[] {
    let points: THREE.Vector3[] = [];
    switch(numberOfLine) {
        case 0: {
            points.push(getFirstPortalPoint(distFromStart));
            points.push(getSecondPortalPoint(distFromStart, heightOfModel));
            return points;
        }
        case 1: {
            points.push(getSecondPortalPoint(distFromStart, heightOfModel));
            points.push(getThirdPortalPoint(distFromStart, heightOfModel, widthOfModel));
            return points;
        }
        case 2: {
            points.push(getThirdPortalPoint(distFromStart, heightOfModel, widthOfModel));
            points.push(getFourthPortalPoint(distFromStart, widthOfModel));
            return points;
        }
        default: {
            return points;
        }
    }
}

export function getFirstPortalPoint(distFromStart: number) : THREE.Vector3 {
    return new THREE.Vector3(distFromStart, 0, 0);
}

export function getSecondPortalPoint(distFromStart: number, heightOfModel: number): THREE.Vector3 {
    return new THREE.Vector3(distFromStart, heightOfModel, 0);
}

export function getThirdPortalPoint(distFromStart: number, heightOfModel: number, widthOfModel: number): THREE.Vector3 {
    return new THREE.Vector3(distFromStart, heightOfModel, -widthOfModel)
}

export function getFourthPortalPoint(distFromStart: number, widthOfModel: number) {
    return new THREE.Vector3(distFromStart, 0, -widthOfModel);
}
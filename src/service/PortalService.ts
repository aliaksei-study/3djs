import * as THREE from "three";
import {Line, Portal} from "../reducer/tableReducer";

export function generatePortal(step: number, distFromStart: number, heightOfPortal: number, portalWidth:number, numberOfPortalLayers: number): Portal {
    let id;
    let stepLayer = heightOfPortal / numberOfPortalLayers;
    let portalLines: Line[] = [];
    let layerHeight = 0;
    for(let i = 0; i < numberOfPortalLayers; i++) {
        let points: THREE.Vector3[] = [];
        layerHeight += stepLayer;
        points.push(getLinePoints(distFromStart, layerHeight, 0));
        points.push(getLinePoints(distFromStart, layerHeight, -portalWidth));
        id = Math.random();
        portalLines.push({id, points})
    }
    layerHeight = 0;
    for(let i = 0; i < numberOfPortalLayers; i++) {
        let points: THREE.Vector3[] = [];
        points.push(getLinePoints(distFromStart, layerHeight, 0));
        layerHeight += stepLayer;
        points.push(getLinePoints(distFromStart, layerHeight, 0));
        id = Math.random();
        portalLines.push({id, points});
    }
    layerHeight = 0;
    for(let i = 0; i < numberOfPortalLayers; i++) {
        let points: THREE.Vector3[] = [];
        points.push(getLinePoints(distFromStart, layerHeight, -portalWidth));
        layerHeight += stepLayer;
        points.push(getLinePoints(distFromStart, layerHeight, -portalWidth));
        id = Math.random();
        portalLines.push({id, points});
    }
    id = Math.random();
    return {id, step, distFromStart, heightOfPortal, numberOfPortalLayers, portalLines}
}

export function getLinePoints(distFromStart: number, layerHeight: number, z: number): THREE.Vector3 {
    return new THREE.Vector3(distFromStart, layerHeight, z);
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
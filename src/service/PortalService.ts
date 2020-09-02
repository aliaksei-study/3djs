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
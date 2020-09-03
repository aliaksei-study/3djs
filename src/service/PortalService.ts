import * as THREE from "three";
import {Line, Portal, RandomLine} from "../reducer/tableReducer";
import {splitLine} from "./LineService";

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

export function splitPortals(portals: Array<Portal>, randomLines: Array<RandomLine>, heightOfModel: number,
                             numberOfLayers: number) {
    let splitedPortalLines = Array<Line>();
    for(let i = 0; i < portals.length; i++) {
        portals[i].portalLines.forEach(line => randomLines.forEach(randomLine => {
            if(line.id === randomLine.firstLineId || line.id === randomLine.secondLineId) {
                splitLine(line, randomLine.points).forEach(portalLine => splitedPortalLines.push(portalLine));
            }
        }))
    }
    console.log(splitedPortalLines);
}
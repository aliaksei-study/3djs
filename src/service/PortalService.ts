import * as THREE from "three";
import {Line, Portal, RandomLine} from "../reducer/tableReducer";
import {splitLine, splitLineWithDifferentPortalParameters} from "./LineService";

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

export function splitPortals(portals: Array<Portal>, randomLines: Array<RandomLine>) : Array<Line> {
    let splitedPortalLines = new Array<Line>();
    for(let i = 0; i < portals.length; i++) {
        portals[i].portalLines.forEach(line => randomLines.forEach(randomLine => {
            if(line.id === randomLine.firstLineId || line.id === randomLine.secondLineId) {
                splitLine(line, randomLine.points).forEach(portalLine => splitedPortalLines.push(portalLine));
            }
        }))
    }
    return splitedPortalLines;
}

export function splitPortalWithDifferentPortalParameters(portals: Array<Portal>, heightOfModel: number, numberOfLayers: number) : Array<Line> {
    let crossingPortalPoints: Array<number> = new Array<number>();
    let crossingModelPoints: Array<number> = new Array<number>();
    let splitedPortalWithDifferentHeightLines = new Array<Line>();
    let stepPortalLayer;
    let stepLayer = heightOfModel / numberOfLayers;
    let basicPortalHeight: number = 0;
    for(let i = 0; i < numberOfLayers; i++) {
        crossingModelPoints.push(basicPortalHeight += stepLayer);
    }
    portals.forEach(portal => {
        if(portal.heightOfPortal !== heightOfModel || portal.numberOfPortalLayers !== numberOfLayers) {
            stepPortalLayer = portal.heightOfPortal / portal.numberOfPortalLayers;
            crossingPortalPoints = [];
            basicPortalHeight = 0;
            for(let i = 0; i < portal.numberOfPortalLayers; i++) {
                crossingPortalPoints.push(basicPortalHeight += stepPortalLayer);
            }
            dividePortalLine(portal.numberOfPortalLayers, portal.portalLines.length - portal.numberOfPortalLayers,
                crossingPortalPoints, crossingModelPoints, portal.portalLines)
                .forEach(line => splitedPortalWithDifferentHeightLines.push(line));
            dividePortalLine(portal.portalLines.length - portal.numberOfPortalLayers, portal.portalLines.length,
                crossingPortalPoints, crossingModelPoints, portal.portalLines)
                .forEach(line => splitedPortalWithDifferentHeightLines.push(line));
        }
    });
    return splitedPortalWithDifferentHeightLines;
}

export function dividePortalLine(firstPortalIndex: number, lastPortalIndex: number, crossingPortalPoints: Array<number>,
                                 crossingModelPoints: Array<number>, portalLines: Array<Line>): Array<Line> {
    let dividedLines: Array<Line> = new Array<Line>();
    let j = 0, k = 0;
    for(firstPortalIndex; firstPortalIndex < lastPortalIndex; firstPortalIndex++) {
        if(crossingPortalPoints[j] < crossingModelPoints[k]) {
            j++;
        } else {
            splitLineWithDifferentPortalParameters(portalLines[firstPortalIndex], crossingModelPoints[k])
                .forEach(line => dividedLines.push(line));
            k++;
        }
    }
    return dividedLines;
}
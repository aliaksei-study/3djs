import {Line, Portal, RandomLine, Section} from "../reducer/tableReducer";
import * as THREE from "three";

export function generateLine(lines: Array<Line>, distFromStart: number, firstLineId: number, secondLineId: number): RandomLine {
    let id;
    let points: THREE.Vector3[] = [];
    for (let i = 0; i < lines.length; i++) {
        let firstPoint = lines[i].points[0];
        let secondPoint = lines[i].points[1];
        if (firstPoint.z === secondPoint.z && firstPoint.x === secondPoint.x) {
            points.push(new THREE.Vector3(firstPoint.x, firstPoint.y + distFromStart, firstPoint.z));
        } else if (firstPoint.y === secondPoint.y && firstPoint.x === secondPoint.x) {
            points.push(new THREE.Vector3(firstPoint.x, firstPoint.y, firstPoint.z - distFromStart));
        } else {
            points.push(new THREE.Vector3(firstPoint.x + distFromStart, firstPoint.y, firstPoint.z));
        }
    }
    id = Math.random();
    return {id, points, firstLineId, secondLineId};
}

export function getModelRandomLine(portals: Array<Portal>, sections: Array<Section>, randomLines: Array<RandomLine>,
                             firstLineId: number, secondLineId: number, distFromStart: number): RandomLine {
    let lines: Array<Line> = new Array<Line>();
    portals.forEach(portal => portal.portalLines.forEach(line => {
        if (line.id === firstLineId || line.id === secondLineId ) {
            lines.push(line);
        }
    }));
    sections.forEach(section => section.sectionLines.forEach(line => {
        if (line.id === firstLineId || line.id === secondLineId) {
            lines.push(line);
        }
    }));
    randomLines.forEach(randomLine => {
        if (randomLine.id === firstLineId || randomLine.id === secondLineId) {
            lines.push(randomLine);
        }
    });
    return generateLine(lines, distFromStart, firstLineId, secondLineId);
}

export function splitLine(line: Line, generatedLinePoints: Array<THREE.Vector3>): Array<Line> {
    let numberOfLines = 2;
    let id;
    let splitedLine: Array<Line> = new Array<Line>();
    if ((line.points[0].x === generatedLinePoints[0].x && line.points[0].y === generatedLinePoints[0].y) ||
        (line.points[0].x === generatedLinePoints[0].x && line.points[0].z === generatedLinePoints[0].z) ||
        (line.points[0].y === generatedLinePoints[0].y && line.points[0].z === generatedLinePoints[0].z)) {
        for (let i = 0; i < numberOfLines; i++) {
            let points;
            id = Math.random();
            points = i === 0 ? generatePointsOfFirstDividedLine(line, generatedLinePoints[0]) : generatePointsOfSecondDividedLine(line, generatedLinePoints[0]);
            splitedLine.push({id, points});
        }
    } else {
        for (let i = 0; i < numberOfLines; i++) {
            let points;
            id = Math.random();
            points = i === 0 ? generatePointsOfFirstDividedLine(line, generatedLinePoints[1]) : generatePointsOfSecondDividedLine(line, generatedLinePoints[1]);
            splitedLine.push({id, points});
        }
    }
    return splitedLine;
}

export function splitLineWithDifferentPortalParameters(portalLine: Line, pointY: number): Array<Line> {
    let lines: Array<Line> = new Array<Line>();
    let id;
    let numberOfLines = 2;
    for (let i = 0; i < numberOfLines; i++) {
        let points: Array<THREE.Vector3> = new Array<THREE.Vector3>();
        id = Math.random();
        if (i === 0) {
            points.push(portalLine.points[0]);
            points.push(new THREE.Vector3(portalLine.points[0].x, pointY, portalLine.points[0].z));
        } else {
            points.push(new THREE.Vector3(portalLine.points[0].x, pointY, portalLine.points[0].z));
            points.push(portalLine.points[1]);
        }
        lines.push({id, points});
    }
    return lines;
}

export function generatePointsOfFirstDividedLine(line: Line, generatedLinePoints: THREE.Vector3): Array<THREE.Vector3> {
    let points: THREE.Vector3[] = [];
    points.push(new THREE.Vector3(line.points[0].x, line.points[0].y, line.points[0].z));
    points.push(new THREE.Vector3(line.points[0].x === generatedLinePoints.x ? line.points[0].x :
        line.points[0].z === generatedLinePoints.z ? line.points[0].x + generatedLinePoints.x : line.points[0].x,
        line.points[0].x === generatedLinePoints.x ? line.points[0].z === generatedLinePoints.z ? generatedLinePoints.y : line.points[0].y : line.points[0].y,
        (line.points[0].x === generatedLinePoints.x && line.points[0].y === generatedLinePoints.y) ? line.points[0].z + generatedLinePoints.z : line.points[0].z));
    return points;
}

export function generatePointsOfSecondDividedLine(line: Line, generatedLinePoints: THREE.Vector3): Array<THREE.Vector3> {
    let points: THREE.Vector3[] = [];
    points.push(new THREE.Vector3(line.points[0].x === generatedLinePoints.x ? line.points[0].x :
        line.points[0].z === generatedLinePoints.z ? line.points[0].x + generatedLinePoints.x : line.points[0].x,
        line.points[0].x === generatedLinePoints.x ? line.points[0].z === generatedLinePoints.z ? generatedLinePoints.y : line.points[0].y : line.points[0].y,
        (line.points[0].x === generatedLinePoints.x && line.points[0].y === generatedLinePoints.y) ? line.points[0].z + generatedLinePoints.z : line.points[0].z));
    points.push(new THREE.Vector3(line.points[1].x, line.points[1].y, line.points[1].z));
    return points;
}
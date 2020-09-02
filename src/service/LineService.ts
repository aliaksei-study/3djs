import {Line} from "../reducer/tableReducer";
import * as THREE from "three";

export function generateLine(lines: Array<Line>, distFromStart: number) : Line {
    let id;
    let points: THREE.Vector3[] = [];
    for(let i = 0; i < lines.length; i++) {
        let firstPoint = lines[i].points[0];
        let secondPoint = lines[i].points[1];
        if(firstPoint.z === secondPoint.z && firstPoint.x === secondPoint.x) {
            points.push(new THREE.Vector3(firstPoint.x, firstPoint.y + distFromStart, firstPoint.z));
        } else if (firstPoint.y === secondPoint.y && firstPoint.x === secondPoint.x) {
            points.push(new THREE.Vector3(firstPoint.x, firstPoint.y, firstPoint.z - distFromStart));
        } else {
            points.push(new THREE.Vector3(firstPoint.x + distFromStart, firstPoint.y, firstPoint.z));
        }
    }
    id = Math.random();
    return {id, points};
}

export function splitLine(line: Line, generatedLine: Line) : Array<Line> {
    let id;
    let splitedLine: Array<Line> = new Array<Line>();
    if((line.points[0].x === generatedLine.points[0].x && line.points[0].y === generatedLine.points[0].y) ||
        (line.points[0].x === generatedLine.points[0].x && line.points[0].z === generatedLine.points[0].z) ||
        (line.points[0].y === generatedLine.points[0].y && line.points[0].z === generatedLine.points[0].z)) {
        let points;
        id = Math.random();
        points = generatePointsOfFirstDividedLine(line, generatedLine.points[0]);
        splitedLine.push({id, points});
    } else {
        let points;
        id = Math.random();
        points = generatePointsOfSecondDividedLine(line, generatedLine.points[1]);
        splitedLine.push({id, points});
    }
    console.log(splitedLine);
    return splitedLine;
}

export function generatePointsOfFirstDividedLine(line: Line, generatedLinePoints: THREE.Vector3) : Array<THREE.Vector3> {
    let points: THREE.Vector3[] = [];
    points.push(new THREE.Vector3(line.points[0].x, line.points[0].y, line.points[0].z));
    points.push(new THREE.Vector3(line.points[0].x === generatedLinePoints.x ? line.points[0].x :
        line.points[0].z === generatedLinePoints.z ? line.points[0].x + generatedLinePoints.x : line.points[0].x,
        line.points[0].x === generatedLinePoints.x ? line.points[0].z === generatedLinePoints.z ? line.points[0].y + generatedLinePoints.y : line.points[0].y : line.points[0].y,
        (line.points[0].x === generatedLinePoints.x && line.points[0].y === generatedLinePoints.y) ? line.points[0].z - generatedLinePoints.z : line.points[0].z));
    return points;
}

export function generatePointsOfSecondDividedLine(line: Line, generatedLinePoints: THREE.Vector3) : Array<THREE.Vector3> {
    let points: THREE.Vector3[] = [];
    points.push(new THREE.Vector3(line.points[0].x === generatedLinePoints.x ? line.points[0].x :
        line.points[0].z === generatedLinePoints.z ? line.points[0].x + generatedLinePoints.x : line.points[0].x,
        line.points[0].x === generatedLinePoints.x ? line.points[0].z === generatedLinePoints.z ? line.points[0].y + generatedLinePoints.y : line.points[0].y : line.points[0].y,
        (line.points[0].x === generatedLinePoints.x && line.points[0].y === generatedLinePoints.y) ? line.points[0].z - generatedLinePoints.z : line.points[0].z));
    points.push(new THREE.Vector3(line.points[1].x, line.points[1].y, line.points[1].z));
    return points;
}
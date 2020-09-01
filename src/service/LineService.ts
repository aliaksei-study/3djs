import {Line} from "../reducer/tableReducer";

export function generateLine(lines: Array<Line>, distFromStart: number) : Line {
    let id;
    let points =[];
    for(let i = 0; i < lines.length; i++) {
        
        points.push(new THREE.Vector3())
    }
}
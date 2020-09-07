import {Portal, RandomLine} from "../reducer/tableReducer";
import * as THREE from "three";
import {Line, Section} from "../reducer/tableReducer";
import {getLinePoints} from "./PortalService";
import {splitLine} from "./LineService";

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

export function splitSections(sections: Array<Section>, randomLines: Array<RandomLine>): Array<Line> {
    let splitedSectionLines = Array<Line>();
    for(let i = 0; i < sections.length; i++) {
        sections[i].sectionLines.forEach(line => randomLines.forEach(randomLine => {
            if(line.id === randomLine.firstLineId || line.id === randomLine.secondLineId) {
                splitLine(line, randomLine.points).forEach(sectionLine => splitedSectionLines.push(sectionLine));
            }
        }))
    }
    return splitedSectionLines;
}

export function regenerateSections(sections: Array<Section>, portalId: number, portals: Array<Portal>, stepLayer: number,
                            widthOfModel: number, numberOfLayers: number): Array<Section> {
    let editablePortals = Array.from(portals);
    let editableSections = Array.from(sections);
    let changedSections: Array<Section> = Array.from(sections).filter(section => section.firstPortalId === portalId ||
        section.secondPortalId === portalId);
    let sectionId;
    for (let i = 0, key = 0; i < changedSections.length; i++, key++) {
        let newSection;
        sectionId = changedSections[i].id;
        let firstPortal = editablePortals.find(portal => portal.id === changedSections[i].firstPortalId);
        let secondPortal = editablePortals.find(portal => portal.id === changedSections[i].secondPortalId);
        if (key === numberOfLayers) {
            key = 0;
        }
        if (firstPortal !== undefined && secondPortal !== undefined) {
            newSection = generateSection(stepLayer * (key + 1), firstPortal, secondPortal, widthOfModel);
            newSection.id = sectionId;
        }
        if (newSection !== undefined) {
            editableSections.splice(editableSections.indexOf(changedSections[i]), 1, newSection);
        }
    }
    return editableSections;
}
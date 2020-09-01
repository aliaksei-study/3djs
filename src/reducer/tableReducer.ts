import * as THREE from "three";
import {ACTION_GENERATE_PORTALS, ACTION_GENERATE_SECTIONS} from "./formReducer";

export interface TableState {
    sections: Array<Section>,
    portals: Array<Portal>,
    removedLineId: number | null,
    lines: Array<Line>
}

export interface Section {
    id: number,
    firstPortalId: number,
    secondPortalId: number,
    sectionLines: Array<Line>
}

export interface Portal {
    id: number,
    step: number
    distFromStart: number,
    heightOfPortal: number,
    numberOfPortalLayers: number,
    portalLines: Array<Line>
}

export interface Line {
    id: number,
    points: Array<THREE.Vector3>
}

const initialState = {
    sections: [],
    portals: [],
    removedLineId: null,
    lines: []
};

export const ACTION_ADD_PORTAL = 'ACTION_ADD_PORTAL';
export const ACTION_ADD_SECTION = 'ACTION_ADD_SECTION';
export const ACTION_REMOVE_LINE = 'ACTION_REMOVE_LINE';
export const ACTION_REMOVE_PORTALS = 'ACTION_REMOVE_PORTALS';
export const ACTION_ADD_LINE = 'ACTION_ADD_LINE';

export const addPortal = (newPortal: Portal) => {
    return {
        type: ACTION_ADD_PORTAL,
        payload: newPortal
    }
};

export const addSection = (newSection: Section) => {
    return {
        type: ACTION_ADD_SECTION,
        payload: newSection
    }
};

export const removeLine = (removedObjectId: number) => {
    return {
        type: ACTION_REMOVE_LINE,
        payload: removedObjectId
    }
};

export const removePortal = (deletedPortalId: number) => {
    return {
        type: ACTION_REMOVE_PORTALS,
        payload: deletedPortalId
    }
};

export const generatePortals = (newPortals: Array<Portal>) => {
    return {
        type: ACTION_GENERATE_PORTALS,
        payload: newPortals
    }
};

export const generateSections = (newSectionLines: Array<Section>) => {
    return {
        type: ACTION_GENERATE_SECTIONS,
        payload: newSectionLines
    }
};

export const addLine = (newLine: Line) => {
    return {
        type: ACTION_ADD_LINE,
        payload: newLine
    }
};

export const tableReducer = (state: TableState = initialState, action: any): TableState => {
    switch (action.type) {
        case ACTION_ADD_PORTAL: {
            return {...state, portals: [...state.portals, action.payload]}
        }
        case ACTION_ADD_SECTION: {
            return {...state, sections: [...state.sections, action.payload]}
        }
        case ACTION_REMOVE_LINE: {
            return {...state, removedLineId: action.payload}
        }
        case ACTION_REMOVE_PORTALS: {
            return {
                ...state,
                portals: [...state.portals.filter(portal => portal.id !== action.payload)],
                removedLineId: null
            }
        }
        case ACTION_GENERATE_PORTALS: {
            return {...state, portals: action.payload}
        }
        case ACTION_GENERATE_SECTIONS: {
            return {...state, sections: action.payload}
        }
        case ACTION_ADD_LINE: {
            return {...state, lines: [...state.lines, action.payload]}
        }
        default:
            return state;
    }
};
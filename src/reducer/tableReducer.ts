import * as THREE from "three";
import {ACTION_GENERATE_PORTALS, ACTION_GENERATE_SECTIONS} from "./formReducer";
import {TableActionTypes} from "../types/TableActionTypes";
import {modelAPI} from "../api/modelAPI";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

export interface TableState {
    sections: Array<Section>,
    portals: Array<Portal>,
    removedLineId: number | null,
    lines: Array<RandomLine>
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

export interface RandomLine extends Line {
    firstLineId: number,
    secondLineId: number
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
export const ACTION_REMOVE_MODEL = 'ACTION_REMOVE_MODEL';
export const ACTION_REMOVE_RANDOM_LINE = 'ACTION_REMOVE_RANDOM_LINE';
export const ACTION_REMOVE_SECTION_LINE = 'ACTION_REMOVE_SECTION_LINE';
export const ACTION_SET_LOADED_MODEL = 'ACTION_SET_LOADED MODEL';

export const addPortal = (newPortal: Portal): TableActionTypes => {
    return {
        type: ACTION_ADD_PORTAL,
        payload: newPortal
    }
};

export const addSection = (newSection: Section): TableActionTypes => {
    return {
        type: ACTION_ADD_SECTION,
        payload: newSection
    }
};

export const removeLine = (removedObjectId: number): TableActionTypes => {
    return {
        type: ACTION_REMOVE_LINE,
        payload: removedObjectId
    }
};

export const removePortal = (deletedPortalId: number): TableActionTypes => {
    return {
        type: ACTION_REMOVE_PORTALS,
        payload: deletedPortalId
    }
};

export const generatePortals = (newPortals: Array<Portal>): TableActionTypes => {
    return {
        type: ACTION_GENERATE_PORTALS,
        payload: newPortals
    }
};

export const generateSections = (newSectionLines: Array<Section>): TableActionTypes => {
    return {
        type: ACTION_GENERATE_SECTIONS,
        payload: newSectionLines
    }
};

export const addLine = (newLine: RandomLine): TableActionTypes => {
    return {
        type: ACTION_ADD_LINE,
        payload: newLine
    }
};

export const removeModel = (): TableActionTypes => {
    return {
        type: ACTION_REMOVE_MODEL,
        payload: initialState
    }
};

export const removeRandomLine = (removedLineId: number): TableActionTypes => {
    return {
        type: ACTION_REMOVE_RANDOM_LINE,
        payload: removedLineId
    }
};

export const removeSection = (removedLineId: number): TableActionTypes => {
    return {
        type: ACTION_REMOVE_SECTION_LINE,
        payload: removedLineId
    }
};

export const setLoadedModel = (tableState: TableState): TableActionTypes => {
    return {
        type: ACTION_SET_LOADED_MODEL,
        payload: tableState
    }
};

export const tableReducer = (state: TableState = initialState, action: TableActionTypes): TableState => {
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
        case ACTION_REMOVE_MODEL: {
            return action.payload;
        }
        case ACTION_REMOVE_RANDOM_LINE: {
            return {...state, lines: [...state.lines.filter(line => line.firstLineId !== action.payload && line.secondLineId !== action.payload)]}
        }
        case ACTION_REMOVE_SECTION_LINE: {
            return {...state, sections: [...state.sections.filter(section => section.id !== action.payload)]}
        }
        case ACTION_SET_LOADED_MODEL: {
            return action.payload;
        }
        default:
            return state;
    }
};

// Promise<void> because we work with request, otherwise should write thunk return value
// instead of thunkAction you can type @code return async (dispatch: Dispatch<TableActionTypes>
export const getModel = (): ThunkAction<Promise<void>, TableState, unknown, TableActionTypes> => {
    return async (dispatch, getState) => {
        let requestData: TableState = await modelAPI.getModel();
        console.log(requestData);
        dispatch(setLoadedModel(requestData));
    }
};

export const sendModel = (tableState: TableState): ThunkAction<Promise<void>, TableState, unknown, TableActionTypes> => {
    return async (dispatch, getState) => {
        let sendData = await modelAPI.sendModel(tableState);
        console.log(sendData.status);
    }
};
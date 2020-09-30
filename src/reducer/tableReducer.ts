import * as THREE from "three";
import {modelAPI} from "../api/modelAPI";
import {ThunkAction} from "redux-thunk";
import {InferActionsTypes} from "../store/store";

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

type TableActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    addPortal: (newPortal: Portal) => ({type: 'ACTION_ADD_PORTAL', payload: newPortal} as const),
    addSection: (newSection: Section) => ({type: 'ACTION_ADD_SECTION', payload: newSection} as const),
    removeLine: (removedObjectId: number) => ({type: 'ACTION_REMOVE_LINE', payload: removedObjectId} as const),
    removePortal: (deletedPortalId: number) => ({type: 'ACTION_REMOVE_PORTALS', payload: deletedPortalId} as const),
    generatePortals: (newPortals: Array<Portal>) => ({type: 'ACTION_GENERATE_PORTALS', payload: newPortals} as const),
    generateSections: (newSectionLines: Array<Section>) => ({type: 'ACTION_GENERATE_SECTIONS', payload: newSectionLines} as const),
    addLine: (newLine: RandomLine) => ({type: 'ACTION_ADD_LINE', payload: newLine} as const),
    removeModel: () => ({type: 'ACTION_REMOVE_MODEL', payload: initialState} as const),
    removeRandomLine: (removedLineId: number) => ({type: 'ACTION_REMOVE_RANDOM_LINE', payload: removedLineId} as const),
    removeSection: (removedLineId: number) => ({type: 'ACTION_REMOVE_SECTION_LINE', payload: removedLineId} as const),
    setLoadedModel: (tableState: TableState) => ({type: 'ACTION_SET_LOADED_MODEL', payload: tableState} as const)
};

export const tableReducer = (state: TableState = initialState, action: TableActionsTypes): TableState => {
    switch (action.type) {
        case 'ACTION_ADD_PORTAL': {
            return {...state, portals: [...state.portals, action.payload]}
        }
        case 'ACTION_ADD_SECTION': {
            return {...state, sections: [...state.sections, action.payload]}
        }
        case 'ACTION_REMOVE_LINE': {
            return {...state, removedLineId: action.payload}
        }
        case 'ACTION_REMOVE_PORTALS': {
            return {
                ...state,
                portals: [...state.portals.filter(portal => portal.id !== action.payload)],
                removedLineId: null
            }
        }
        case 'ACTION_GENERATE_PORTALS': {
            return {...state, portals: action.payload}
        }
        case 'ACTION_GENERATE_SECTIONS': {
            return {...state, sections: action.payload}
        }
        case 'ACTION_ADD_LINE': {
            return {...state, lines: [...state.lines, action.payload]}
        }
        case 'ACTION_REMOVE_MODEL': {
            return action.payload;
        }
        case 'ACTION_REMOVE_RANDOM_LINE': {
            return {...state, lines: [...state.lines.filter(line => line.firstLineId !== action.payload && line.secondLineId !== action.payload)]}
        }
        case 'ACTION_REMOVE_SECTION_LINE': {
            return {...state, sections: [...state.sections.filter(section => section.id !== action.payload)]}
        }
        case 'ACTION_SET_LOADED_MODEL': {
            return action.payload;
        }
        default:
            return state;
    }
};

// Promise<void> because we work with request and by default async function return Promise
// instead of thunkAction you can type @code return async (dispatch: Dispatch<TableActionTypes>
export const getModel = (): ThunkAction<Promise<void>, TableState, unknown, TableActionsTypes> => {
    return async (dispatch, getState) => {
        let requestData: TableState = await modelAPI.getModel();
        console.log(requestData);
        dispatch(actions.setLoadedModel(requestData));
    }
};

export const sendModel = (tableState: TableState): ThunkAction<Promise<void>, TableState, unknown, TableActionsTypes> => {
    return async (dispatch, getState) => {
        let sendData = await modelAPI.sendModel(tableState);
        console.log(sendData.status);
    }
};
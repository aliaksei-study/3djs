import * as THREE from "three";


export interface FormState {
    numberOfLayers: number | null;
    numberOfPortals: number | null;
    lengthOfModel: number | null,
    heightOfModel: number | null,
    widthOfModel: number | null,
    direction: string | null,
    sections: Array<Section>,
    portals: Array<Portal>,
    removedLineId: number | null
}

export interface Section {
    id: number,
    firstPortalId: number,
    secondPortalId: number,
    sectionLines: Array<Line>
}

export interface Portal {
    id:number,
    step:number
    distFromStart: number,
    portalWidth: number,
    portalLines: Array<Line>
}

export interface Line {
    id: number,
    points: Array<THREE.Vector3>
}

const initialState: FormState = {
    numberOfLayers: null,
    numberOfPortals: null,
    lengthOfModel: null,
    heightOfModel: null,
    widthOfModel: null,
    direction: null,
    sections: [],
    portals: [],
    removedLineId: null
};

export const ACTION_CHANGE_NUMBER_OF_LAYERS = 'ACTION_CHANGE_NUMBER_OF_LAYERS';
export const ACTION_CHANGE_NUMBER_OF_PORTALS = 'ACTION_CHANGE_NUMBER_OF_PORTALS';
export const ACTION_CHANGE_LENGTH_OF_MODEL = 'ACTION_CHANGE_LENGTH_OF_MODEL';
export const ACTION_CHANGE_HEIGHT_OF_MODEL = 'ACTION_CHANGE_HEIGHT_OF_MODEL';
export const ACTION_CHANGE_WIDTH_OF_MODEL = 'ACTION_CHANGE_WIDTH_OF_MODEL';
export const ACTION_CHANGE_DIRECTION = 'ACTION_CHANGE_DIRECTION';
export const ACTION_GENERATE_PORTALS = 'ACTION_GENERATE_PORTALS';
export const ACTION_GENERATE_SECTIONS = 'ACTION_GENERATE_SECTIONS';
export const ACTION_ADD_PORTAL = 'ACTION_ADD_PORTAL';
export const ACTION_ADD_SECTION = 'ACTION_ADD_SECTION';
export const ACTION_REMOVE_LINE = 'ACTION_REMOVE_LINE';
export const ACTION_REMOVE_PORTALS = 'ACTION_REMOVE_PORTALS';

export const changeNumberOfLayers = (newNumberOfLayers: number) => {
    return {
        type: ACTION_CHANGE_NUMBER_OF_LAYERS,
        payload: newNumberOfLayers
    }
};

export const changeNumberOfPortals = (newNumberOfPortals: number) => {
    return {
        type: ACTION_CHANGE_NUMBER_OF_PORTALS,
        payload: newNumberOfPortals
    }
};

export const changeLengthOfModel = (newLengthOfModel: number) => {
    return {
        type: ACTION_CHANGE_LENGTH_OF_MODEL,
        payload: newLengthOfModel
    }
};

export const changeHeightOfModel = (newHeightOfModel: number) => {
    return {
        type: ACTION_CHANGE_HEIGHT_OF_MODEL,
        payload: newHeightOfModel
    }
};

export const changeWidthOfModel = (newWidthOfModel: number) => {
    return {
        type: ACTION_CHANGE_WIDTH_OF_MODEL,
        payload: newWidthOfModel
    }
};

export const changeDirection = (newDirection: any) => {
    return {
        type: ACTION_CHANGE_DIRECTION,
        payload: newDirection
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


export const formReducer = (state: FormState = initialState, action: any): FormState => {
    switch (action.type) {
        case ACTION_CHANGE_NUMBER_OF_LAYERS: {
            return {...state, numberOfLayers: action.payload}
        }
        case ACTION_CHANGE_NUMBER_OF_PORTALS: {
            return {...state, numberOfPortals: action.payload}
        }
        case ACTION_CHANGE_LENGTH_OF_MODEL: {
            return {...state, lengthOfModel: action.payload}
        }
        case ACTION_CHANGE_HEIGHT_OF_MODEL: {
            return {...state, heightOfModel: action.payload}
        }
        case ACTION_CHANGE_WIDTH_OF_MODEL: {
            return {...state, widthOfModel: action.payload}
        }
        case ACTION_CHANGE_DIRECTION: {
            return {...state, direction: action.payload}
        }
        case ACTION_GENERATE_PORTALS: {
            return {...state, portals: action.payload}
        }
        case ACTION_GENERATE_SECTIONS: {
            return {...state, sections:action.payload}
        }
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
            return {...state, portals: [...state.portals.filter(portal => portal.id !== action.payload)], removedLineId: null}
        }
        default:
            return state;
    }
};
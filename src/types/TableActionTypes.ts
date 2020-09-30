import {
    ACTION_ADD_LINE,
    ACTION_ADD_PORTAL,
    ACTION_ADD_SECTION,
    ACTION_REMOVE_LINE, ACTION_REMOVE_MODEL,
    ACTION_REMOVE_PORTALS, ACTION_REMOVE_RANDOM_LINE, ACTION_REMOVE_SECTION_LINE, ACTION_SET_LOADED_MODEL, Line,
    Portal, RandomLine,
    Section, TableState
} from "../reducer/tableReducer";
import {ACTION_GENERATE_PORTALS, ACTION_GENERATE_SECTIONS} from "../reducer/formReducer";

export type AddPortalType = {
    type: typeof ACTION_ADD_PORTAL,
    payload: Portal
}

export type AddSectionType = {
    type: typeof ACTION_ADD_SECTION,
    payload: Section
}

export type RemoveLineType = {
    type: typeof ACTION_REMOVE_LINE,
    payload: number
}

export type RemovePortalType = {
    type: typeof ACTION_REMOVE_PORTALS,
    payload: number
}

export type GeneratePortalsType = {
    type: typeof ACTION_GENERATE_PORTALS,
    payload: Array<Portal>
}

export type GenerateSectionsType = {
    type: typeof ACTION_GENERATE_SECTIONS,
    payload: Array<Section>
}

export type AddLineType = {
    type: typeof ACTION_ADD_LINE,
    payload: RandomLine
}

export type RemoveModelType = {
    type: typeof ACTION_REMOVE_MODEL,
    payload: TableState
}

export type RemoveRandomLineType = {
    type: typeof ACTION_REMOVE_RANDOM_LINE,
    payload: number
}

export type RemoveSectionType = {
    type: typeof ACTION_REMOVE_SECTION_LINE,
    payload: number
}

export type SetLoadedModelType = {
    type: typeof ACTION_SET_LOADED_MODEL,
    payload: TableState
}

export type TableActionTypes = AddPortalType | AddSectionType | RemoveLineType | RemovePortalType | GeneratePortalsType
    | GenerateSectionsType | AddLineType | RemoveModelType | RemoveRandomLineType | RemoveSectionType | SetLoadedModelType;
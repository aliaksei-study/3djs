import {Portal, RandomLine, Section} from "../reducer/tableReducer";
import {splitPortals} from "./PortalService";
import {splitSections} from "./SectionService";

export function splitModel(portals: Array<Portal>, sections: Array<Section>, randomLines: Array<RandomLine>,
                           heightOfModel: number, numberOfLayers: number) {
    splitPortals(portals, randomLines, heightOfModel, numberOfLayers);
    splitSections(sections, randomLines);
}
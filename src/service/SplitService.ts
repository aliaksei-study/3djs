import {Line, Portal, RandomLine, Section} from "../reducer/tableReducer";
import {splitPortals, splitPortalWithDifferentPortalParameters} from "./PortalService";
import {splitSections} from "./SectionService";

export function splitModel(portals: Array<Portal>, sections: Array<Section>, randomLines: Array<RandomLine>,
                           heightOfModel: number, numberOfLayers: number) {
    let splitMap = new Map<string, Array<Line>>();
    splitMap.set("portals", splitPortals(portals, randomLines));
    splitMap.set("sections", splitSections(sections, randomLines));
    splitMap.set("portalsWithDifferentParameters", splitPortalWithDifferentPortalParameters(portals, heightOfModel, numberOfLayers));
    console.log(splitMap);
}
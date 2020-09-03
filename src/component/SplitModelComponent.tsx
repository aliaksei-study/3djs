import React from 'react';
import {useSelector, useStore} from "react-redux";
import {RootState} from "../store/store";
import {splitModel} from "../service/SplitService";

function SplitModelComponent() {
    const portals = useSelector((state: RootState) => state.table.portals);
    const sections = useSelector((state: RootState) => state.table.sections);
    const lines = useSelector((state: RootState) => state.table.lines);
    const heightOfModel = useSelector((state: RootState) => state.form.heightOfModel);
    const numberOfLayers = useSelector((state: RootState) => state.form.numberOfLayers);
    return (
        <button type="button" className="btn btn-dark ml-3" onClick={() => {
            if(heightOfModel !== null && numberOfLayers !== null) {
                splitModel(portals, sections, lines, heightOfModel, numberOfLayers);
            }
        }}>Split model</button>
    )
}

export default SplitModelComponent;
import {useDispatch, useSelector, useStore} from "react-redux";
import {RootState} from "../store/store";
import {actions, Portal, Section} from "../reducer/tableReducer";
import {generatePortal} from "../service/PortalService";
import {generateSection} from "../service/SectionService";
import {pressGenerateButton} from "../reducer/generateButtonReducer";
import React, {ChangeEvent} from "react";
import {
    changeHeightOfModel,
    changeLengthOfModel,
    changeNumberOfLayers,
    changeNumberOfPortals, changeWidthOfModel
} from "../reducer/formReducer";
import {FormGroup, InputGroup} from "@blueprintjs/core";

function FormComponent() {
    const store = useStore<RootState, any>();
    const generateButton = useSelector((state: RootState) => state.generateButton.isPressed);
    const numberOfPortals = useSelector((state:RootState) => state.modelForm.numberOfPortals);
    const heightOfModel = useSelector((state:RootState) => state.modelForm.heightOfModel);
    const numberOfLayers = useSelector((state:RootState) => state.modelForm.numberOfLayers);
    const widthOfModel = useSelector((state:RootState) => state.modelForm.widthOfModel);
    const lengthOfModel = useSelector((state: RootState) => state.modelForm.lengthOfModel);
    const dispatch = useDispatch();

    function generateModel() {
        let portals: Portal[] = [];
        let sections: Section[] = [];
        let distFromStart = 0;
        if(lengthOfModel !== null && numberOfPortals !== null && heightOfModel !== null &&
            numberOfLayers !== null && widthOfModel !== null) {
            let step = lengthOfModel / (numberOfPortals - 1);
            let stepLayer = heightOfModel / numberOfLayers;
            for (let j = 0; j < numberOfPortals; j++) {
                portals.push(generatePortal(step, distFromStart, heightOfModel, widthOfModel, numberOfLayers));
                distFromStart += step;
            }
            dispatch(actions.generatePortals(portals));
            let tableState = store.getState().table;
            for (let j = 0; j < numberOfPortals - 1; j++) {
                for (let i = 0; i < numberOfLayers; i++) {
                    sections.push(generateSection(stepLayer, tableState.portals[j], tableState.portals[j + 1], widthOfModel));
                    stepLayer += stepLayer;
                }
            }
        }
        dispatch(actions.generateSections(sections));
        dispatch(pressGenerateButton(true));
    }

    return (
        <div>
            <form className="mt-3 ml-5 mr-5">
                <div className="form-row mt-3">
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            id="layersInput"
                            placeholder="Number of layers"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeNumberOfLayers(+event.target.value));
                            }}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            id="portalsInput"
                            placeholder="Number of portals"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeNumberOfPortals(+event.target.value));
                            }}
                        />
                    </div>
                </div>
                <div className="form-row mt-3">
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            id="lengthInput"
                            placeholder="Length of model"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeLengthOfModel(+event.target.value));
                            }}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            id="heightInput"
                            placeholder="Height of model"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeHeightOfModel(+event.target.value));
                            }}
                        />
                    </div>
                </div>
                <div className="form-row mt-3">
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            id="widthInput"
                            placeholder="Width of model"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeWidthOfModel(+event.target.value));
                            }}
                        />
                    </div>
                </div>
                <div className="form-col">
                    <FormGroup className="form-group-col">
                        <InputGroup type="number" large={true} min={1} className="form-input-spacing" placeholder="NumberOfLayers"/>
                    </FormGroup>
                    <FormGroup className="form-group-col">
                        <InputGroup type="number" large={true} min={1} className="form-input-spacing" placeholder="NumberOfLayers"/>
                    </FormGroup>
                    <FormGroup className="form-group-col">
                        <InputGroup type="number" large={true} min={1} className="form-input-spacing" placeholder="NumberOfLayers"/>
                    </FormGroup>
                </div>
                <button type="button"
                        className="btn btn-outline-success mt-3 mx-auto d-block"
                        onClick={(event) => {
                            generateModel();
                        }
                        }>Generate
                </button>
            </form>
        </div>
    )
}

// const FormComponent: React.FC<InjectedFormProps<FormState>> = ({handleSubmit, error}) => {
//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="numberOfLayers">NumberOfLayers</label>
//                 <Field name="numberOfLayers" component="input" type="number"/>
//             </div>
//             <div>
//                 <label htmlFor="numberOfPortals">NumberOfPortals</label>
//                 <Field name="numberOfPortals" component="input" type="number"/>
//             </div>
//             <div>
//                 <label htmlFor="lengthOfModel">Length of model</label>
//                 <Field name="lengthOfModel" component="input" type="number"/>
//             </div>
//             <div>
//                 <label htmlFor="heightOfModel">HeightOfModel</label>
//                 <Field name="HeightOfModel" component="input" type="number"/>
//             </div>
//             <div>
//                 <label htmlFor="widthOfModel">Width of model</label>
//                 <Field name="widthOfModel" component="input" type="number"/>
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     )
// };

export default FormComponent;

//export default reduxForm<FormState>({form: 'modelForm'})(FormComponent);